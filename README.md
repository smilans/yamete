# Yamete Project

![Grup Telegram](https://t.me/vpn_injectorid)
![Channel Telegram](https://t.me/smilans)

## Hosting
Dihosting di [GITHUB](https://smilans.github.io/yamete/).

## Grup Telegram
- [Grup Telegram](https://t.me/vpn_injectorid)

## Channel Telegram
- [Channel Telegram](https://t.me/smilans)

## Animasi Ular 🐍

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Snake Loading Animation</title>
<style>
    .snake {
        width: 100px;
        height: 100px;
        position: relative;
        margin: 100px auto;
    }

    .snake span {
        display: block;
        position: absolute;
        width: 15px;
        height: 15px;
        background: #000;
        border-radius: 50%;
        animation: move 1s linear infinite;
    }

    @keyframes move {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(30px, 30px); }
        50% { transform: translate(60px, 0); }
        75% { transform: translate(30px, -30px); }
    }

    .snake span:nth-child(2) {
        animation-delay: 0.2s;
    }

    .snake span:nth-child(3) {
        animation-delay: 0.4s;
    }

    .snake span:nth-child(4) {
        animation-delay: 0.6s;
    }

    .snake span:nth-child(5) {
        animation-delay: 0.8s;
    }
</style>
</head>
<body>
<div class="snake">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
</div>
</body>
</html>
