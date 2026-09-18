$port = 8080
$root = "d:\WEBSITE PROJECT"
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
$listener.Start()

Write-Output "HTTP Server listening on 0.0.0.0:$port"

$mime = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".png"  = "image/png"
    ".svg"  = "image/svg+xml"
    ".json" = "application/json"
    ".mp4"  = "video/mp4"
    ".webm" = "video/webm"
}

try {
    while ($true) {
        try {
            $client = $listener.AcceptTcpClient()
            $stream = $client.GetStream()
            $stream.ReadTimeout = 10000
            $stream.WriteTimeout = 10000
            $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::UTF8)

            $requestLine = $reader.ReadLine()
            if ([string]::IsNullOrWhiteSpace($requestLine)) {
                $client.Close()
                continue
            }

            $parts = $requestLine.Split(" ")
            if ($parts.Length -lt 2) {
                $client.Close()
                continue
            }

            $rawUrl = $parts[1]
            $cleanPath = $rawUrl.Split("?")[0]
            $cleanPath = [System.Uri]::UnescapeDataString($cleanPath)
            if ($cleanPath -eq "/" -or $cleanPath -eq "") { $cleanPath = "/index.html" }

            # Consume remaining request headers safely
            while ($line = $reader.ReadLine()) {
                if ([string]::IsNullOrWhiteSpace($line)) { break }
            }

            $localFilePath = Join-Path $root ($cleanPath.TrimStart("/").Replace("/", "\"))

            if (Test-Path $localFilePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localFilePath).ToLower()
                $contentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($localFilePath)

                $header = "HTTP/1.1 200 OK`r`nContent-Type: $contentType`r`nContent-Length: $($bytes.Length)`r`nAccept-Ranges: bytes`r`nAccess-Control-Allow-Origin: *`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)

                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $body = [System.Text.Encoding]::UTF8.GetBytes("<h1>404 Not Found</h1>")
                $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/html; charset=utf-8`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
                $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)

                $stream.Write($headerBytes, 0, $headerBytes.Length)
                $stream.Write($body, 0, $body.Length)
            }

            $stream.Flush()
            $client.Close()
        } catch {
            # Safely ignore individual connection/stream aborts and keep server alive
            if ($client) {
                try { $client.Close() } catch {}
            }
        }
    }
} finally {
    $listener.Stop()
}
