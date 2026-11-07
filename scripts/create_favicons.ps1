Add-Type -AssemblyName System.Drawing

$srcFile = (Resolve-Path "public\hos_logo.jpg").Path
$src = [System.Drawing.Bitmap]::FromFile($srcFile)

# Tight crop so the logo occupies the maximum possible area of the circular favicon (eliminating empty margin)
$cropRadius = 540
$cropDiameter = $cropRadius * 2
$cropX = [int](($src.Width / 2) - $cropRadius)
$cropY = [int](($src.Height / 2) - $cropRadius)
$srcRect = New-Object System.Drawing.Rectangle $cropX, $cropY, $cropDiameter, $cropDiameter

function Generate-Circular-Icon($size, $dstPath) {
    $bmp = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(0.0, 0.0, [float]$size, [float]$size)
    $g.SetClip($path)

    $dstRect = New-Object System.Drawing.Rectangle 0, 0, $size, $size
    $g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

    $fullDst = Join-Path (Get-Location) $dstPath
    $bmp.Save($fullDst, [System.Drawing.Imaging.ImageFormat]::Png)

    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $dstPath ($size x $size)"
}

Generate-Circular-Icon 512 "public\favicon.png"
Generate-Circular-Icon 192 "public\favicon-192x192.png"
Generate-Circular-Icon 180 "public\apple-touch-icon.png"
Generate-Circular-Icon 48 "public\favicon-48x48.png"
Generate-Circular-Icon 32 "public\favicon-32x32.png"
Generate-Circular-Icon 16 "public\favicon-16x16.png"

# Save 48x48 as favicon.ico
$icoBmp = [System.Drawing.Bitmap]::FromFile((Resolve-Path "public\favicon-48x48.png").Path)
$icoHicon = $icoBmp.GetHicon()
$ico = [System.Drawing.Icon]::FromHandle($icoHicon)
$fs = New-Object System.IO.FileStream ((Join-Path (Get-Location) "public\favicon.ico")), ([System.IO.FileMode]::Create)
$ico.Save($fs)
$fs.Close()
$icoBmp.Dispose()
Write-Host "Generated: public\favicon.ico"

$src.Dispose()

