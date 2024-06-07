//---------------index.html----------------
const PageScripts = {
    toggleMenu: function (side) {
        console.log(`toggleMenu called with side: ${side}`);
        const body = document.body;
        const btnLeft = document.querySelector('.menu-btn.left');
        const btnRight = document.querySelector('.menu-btn.right');
        const menuLeft = document.getElementById('left-menu');
        const menuRight = document.getElementById('right-menu');
        const infoContent = document.getElementById('info-content');

        if (side === 'left') {
            if (body.classList.contains('menu-open-left')) {
                body.classList.remove('menu-open-left');
                btnLeft.classList.remove('open');
                menuLeft.classList.remove('open');
                infoContent.style.opacity = '1';
            } else {
                body.classList.add('menu-open-left');
                btnLeft.classList.add('open');
                menuLeft.classList.add('open');
                body.classList.remove('menu-open-right');
                btnRight.classList.remove('open');
                menuRight.classList.remove('open');
                infoContent.style.opacity = '0';
            }
        } else if (side === 'right') {
            if (body.classList.contains('menu-open-right')) {
                body.classList.remove('menu-open-right');
                btnRight.classList.remove('open');
                menuRight.classList.remove('open');
                infoContent.style.opacity = '1';
            } else {
                body.classList.add('menu-open-right');
                btnRight.classList.add('open');
                menuRight.classList.add('open');
                body.classList.remove('menu-open-left');
                btnLeft.classList.remove('open');
                menuLeft.classList.remove('open');
                infoContent.style.opacity = '0';
            }
        }
    },

    initialize: function () {
        console.log('PageScripts.initialize called');
        if (document.querySelector('.menu-btn.left')) {
            document.querySelector('.menu-btn.left').addEventListener('click', () => {
                PageScripts.toggleMenu('left');
            });
        }

        if (document.querySelector('.menu-btn.right')) {
            document.querySelector('.menu-btn.right').addEventListener('click', () => {
                PageScripts.toggleMenu('right');
            });
        }
    }
};

// Initialize page scripts
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded event');
    PageScripts.initialize();
});



//-----------------cekxl.html--------------
async function cekKuota() {
    const msisdn = document.getElementById("msisdn").value;
    const url = `https://apigw.kmsp-store.com/sidompul/v1/cek_kuota?msisdn=${msisdn}&isJSON=true`;
    const headers = {
        'Authorization': 'Basic c2lkb21wdWxhcGk6YXBpZ3drbXNw',
        'X-API-Key': '6fb99971-2a2f-40ed-815d-a64df9f3c975',
        'X-App-Version': '1.0.0',
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        const result = await response.json();
        displayResult(result);
        document.getElementById('copyButton').style.display = 'block';
    } catch (error) {
        document.getElementById("result").innerText = 'Error: ' + error.message;
    }
}

function displayResult(data) {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = '';

    function createElement(value) {
        const p = document.createElement('p');
        p.innerHTML = value;
        p.style.textAlign = 'left'; // Ensure text is left-aligned
        return p;
    }

    if (data.message) {
        resultDiv.appendChild(createElement(`Pesan: ${data.message}`));
        resultDiv.appendChild(document.createElement('div')).classList.add('separator');
    }

    if (data.data && data.data.hasil) {
        const hasilContent = data.data.hasil.replace(/\\u([0-9A-F]{4})/gi, function (match, grp) {
            return String.fromCharCode(parseInt(grp, 16));
        }).replace(/<br>/gi, '<br/>').split('<br/><br/>');

        hasilContent.forEach((section, index) => {
            if (index > 0) {
                resultDiv.appendChild(document.createElement('div')).classList.add('separator');
            }
            section.split('<br/>').forEach(line => {
                resultDiv.appendChild(createElement(line));
            });
        });
    }
}

function copyResult() {
    const resultDiv = document.getElementById("result");
    const resultText = Array.from(resultDiv.childNodes).map(node => {
        if (node.classList && node.classList.contains('separator')) {
            return '──────────────────';
        }
        return node.innerText || '';
    }).join('\n');

    navigator.clipboard.writeText(resultText).then(function() {
        alert('Hasil berhasil disalin!');
    }, function(err) {
        alert('Gagal menyalin hasil: ', err);
    });
}



//--------------asci.html-------------

        document.getElementById('copy').addEventListener('click', () => {
            const output = document.getElementById('output');
            const range = document.createRange();
            range.selectNodeContents(output);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            alert('ASCII art copied to clipboard!');
        });

        document.getElementById('download').addEventListener('click', () => {
            const output = document.getElementById('output').innerText;
            const filename = document.getElementById('filename').value || 'ascii_art';
            const blob = new Blob([output], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${filename}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        function toggleMenu() {
            var menu = document.getElementById('menu');
            var btn = document.querySelector('.menu-btn');
            var body = document.body;
            var container = document.querySelector('.container');
            
            if (menu.style.display === 'flex') {
                menu.style.display = 'none';
                btn.classList.remove('open');
                body.classList.remove('menu-open');
                container.style.transform = 'translate(-50%, -50%)';
            } else {
                menu.style.display = 'flex';
                btn.classList.add('open');
                body.classList.add('menu-open');
                container.style.transform = 'translate(-50%, -20%)';
            }
        }


//----------clashhh
function sanitizeBase64(input) {
    return input.replace(/[^A-Za-z0-9+/=]/g, '');
}

function decodeVmessToClash(vmessUrl) {
    try {
        const base64EncodedData = vmessUrl.slice(8).split('#')[0];
        const sanitizedData = sanitizeBase64(base64EncodedData);
        const paddedBase64EncodedData = sanitizedData.padEnd(sanitizedData.length + (4 - sanitizedData.length % 4) % 4, '=');
        const decodedData = atob(paddedBase64EncodedData);
        const vmessData = JSON.parse(decodedData);

        const baseConfig = {
            name: vmessData.ps,
            type: 'vmess',
            server: vmessData.add,
            port: parseInt(vmessData.port, 10),
            uuid: vmessData.id,
            alterId: 0,
            cipher: 'auto',
            udp: true,
            tls: vmessData.tls === 'tls',
            'skip-cert-verify': true,
            servername: vmessData.add
        };

        if (vmessData.net === 'ws') {
            baseConfig.network = 'ws';
            baseConfig['ws-opts'] = {
                path: '/' + vmessData.path.replace(/^\//, ''),
                headers: { Host: vmessData.add }
            };
        } else if (vmessData.net === 'grpc') {
            baseConfig.network = 'grpc';
            baseConfig['grpc-opts'] = {
                'grpc-service-name': 'vmess-grpc',
                'grpc-mode': 'gun'
            };
        }

        return baseConfig;
    } catch (e) {
        return { error: 'Error decoding VMess URL: ' + e.message };
    }
}

function decodeVlessToClash(vlessUrl) {
    try {
        const parts = vlessUrl.split("#");
        const url = parts[0].slice(8);
        const name = parts[1] || "Unnamed";
        const [uuid, rest] = url.split("@");
        const [server, port] = rest.split(":");
        const query = new URLSearchParams(port.split("?")[1]);

        const config = {
            name,
            type: 'vless',
            server,
            port: parseInt(port.split("?")[0], 10),
            uuid,
            cipher: 'auto',
            udp: true,
            tls: query.get('security') === 'tls',
            'skip-cert-verify': true,
            servername: query.get('sni') || server,
            network: query.get('type') || '',
        };

        if (config.network === 'ws') {
            config['ws-opts'] = {
                path: query.get('path') || '/',
                headers: { Host: query.get('host') || server }
            };
        } else if (config.network === 'grpc') {
            config['grpc-opts'] = {
                'grpc-service-name': query.get('serviceName') || '',
                'grpc-mode': 'gun'
            };
        }

        return config;
    } catch (e) {
        return { error: 'Error decoding VLESS URL: ' + e.message };
    }
}

function decodeTrojanToClash(trojanUrl) {
    try {
        const [url, name = "Unnamed"] = trojanUrl.split('#');
        const [creds, params] = url.slice(9).split('?');
        const [password, rest] = creds.split('@');
        const [server, port] = rest.split(':');
        const query = new URLSearchParams(params);

        const config = {
            name: name.trim(),
            type: 'trojan',
            server,
            port: parseInt(port, 10),
            password,
            udp: true,
            sni: query.get('sni') || server,
            'skip-cert-verify': query.get('security') === 'tls',
            network: query.get('type') || ''
        };

        if (config.network === 'ws') {
            config['ws-opts'] = {
                path: query.get('path') || '/',
                headers: { Host: query.get('host') || server }
            };
        } else if (config.network === 'grpc') {
            config['grpc-opts'] = {
                'grpc-service-name': query.get('serviceName') || 'grpcservicename'
            };
        }

        return config;
    } catch (e) {
        return { error: 'Error decoding Trojan URL: ' + e.message };
    }
}

function prettyPrintConfig(config, configNames) {
    if (config.error) return config.error;

    let originalName = config.name;
    let name = originalName;
    let count = 1;
    while (configNames.has(name)) {
        name = `${originalName}-${count}`;
        count++;
    }
    configNames.add(name);
    config.name = name;

    const output = [
        `- name: ${config.name}`,
        `  server: ${config.server}`,
        `  port: ${config.port}`,
        `  type: ${config.type}`
    ];

    if (config.type === 'vmess') {
        output.push(
            `  uuid: ${config.uuid}`,
            `  alterId: ${config.alterId}`,
            `  cipher: ${config.cipher}`,
            `  tls: ${config.tls}`,
            `  servername: ${config.servername}`,
            `  skip-cert-verify: ${config['skip-cert-verify']}`,
            `  udp: ${config.udp}`,
            `  network: ${config.network}`
        );
        if (config['ws-opts']) {
            output.push(`  ws-opts:`, `    path: ${config['ws-opts'].path}`, `    headers:`);
            for (const [key, value] of Object.entries(config['ws-opts'].headers)) {
                output.push(`      ${key}: ${value}`);
            }
        } else if (config['grpc-opts']) {
            output.push(`  grpc-opts:`, `    grpc-service-name: ${config['grpc-opts']['grpc-service-name']}`);
        }
    } else if (config.type === 'vless') {
        output.push(
            `  uuid: ${config.uuid}`,
            `  cipher: ${config.cipher}`,
            `  tls: ${config.tls}`,
            `  servername: ${config.servername}`,
            `  skip-cert-verify: ${config['skip-cert-verify']}`,
            `  udp: ${config.udp}`,
            `  network: ${config.network}`
        );
        if (config['ws-opts']) {
            output.push(`  ws-opts:`, `    path: ${config['ws-opts'].path}`, `    headers:`);
            for (const [key, value] of Object.entries(config['ws-opts'].headers)) {
                output.push(`      ${key}: ${value}`);
            }
        } else if (config['grpc-opts']) {
            output.push(`  grpc-opts:`, `    grpc-service-name: ${config['grpc-opts']['grpc-service-name']}`);
        }
    } else if (config.type === 'trojan') {
        output.push(
            `  password: ${config.password}`,
            `  sni: ${config.sni}`,
            `  skip-cert-verify: ${config['skip-cert-verify']}`,
            `  udp: ${config.udp}`,
            `  network: ${config.network}`
        );
        if (config['ws-opts']) {
            output.push(`  ws-opts:`, `    path: ${config['ws-opts'].path}`, `    headers:`);
            for (const [key, value] of Object.entries(config['ws-opts'].headers)) {
                output.push(`      ${key}: ${value}`);
            }
        } else if (config['grpc-opts']) {
            output.push(`  grpc-opts:`, `    grpc-service-name: ${config['grpc-opts']['grpc-service-name']}`);
        }
    }

    return output.join('\n');
}

function convertURLs() {
    const urls = document.getElementById('urls').value.trim().split('\n');
    let results = 'proxies:\n';
    let configNames = new Set();

    urls.forEach(url => {
        let config;

        if (url.startsWith('vmess://')) {
            config = decodeVmessToClash(url);
        } else if (url.startsWith('vless://')) {
            config = decodeVlessToClash(url);
        } else if (url.startsWith('trojan://')) {
            config = decodeTrojanToClash(url);
        } else {
            config = { error: 'URL tidak valid. Harap masukkan URL VMess, VLESS, atau Trojan.' };
        }

        const result = prettyPrintConfig(config, configNames);
        results += result + '\n';
    });

    document.getElementById('result').innerText = results;
    document.getElementById('copyButton').style.display = 'block';
}

function copyResult() {
    const resultText = document.getElementById('result').innerText;
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = resultText;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    alert('Hasil berhasil disalin!');
}

function downloadConfig() {
    const result = document.getElementById('result').innerText;
    const filename = document.getElementById('filename').value.trim() || 'config';

    const blob = new Blob([result], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Dynamically resize the textarea based on input
const textarea = document.getElementById('urls');
textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});








document.getElementById('dnsForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const command = document.getElementById('command').value;
    const value = document.getElementById('value').value;
    let response = "";

    switch (command) {
        case "subdomains":
            response = await findSubdomains(value);
            break;
        case "realip":
            response = await detectRealIP(value);
            break;
        case "cloudflare":
            response = await detectCloudflare(value);
            break;
        case "dns":
            response = await getDNSRecords(value);
            break;
        case "iptohost":
            response = await ipToHostname(value);
            break;
        case "hosttoip":
            response = await hostnameToIP(value);
            break;
        default:
            response = "Invalid command.";
            break;
    }

    document.getElementById('responseContainer').innerText = response;
});

async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function findSubdomains(domain) {
    const url = `https://crt.sh/?q=%25.${domain}&output=json`;
    try {
        const data = await fetchJSON(url);
        return data.map(entry => entry.name_value).join("\n");
    } catch (error) {
        return "Error fetching subdomains: " + error.message;
    }
}

async function detectRealIP(domain) {
    try {
        const ip = await resolveDNS(domain);
        return ip || "Could not resolve domain.";
    } catch (error) {
        return "Error detecting real IP: " + error.message;
    }
}

async function resolveDNS(domain, type = 'A') {
    const url = `https://dns.google/resolve?name=${domain}&type=${type}`;
    try {
        const data = await fetchJSON(url);
        if (data && data.Answer) {
            return data.Answer.map(record => record.data).join(", ");
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

function isCloudflareIP(ip) {
    const cloudflareIPRanges = [
        '104.16.', '104.17.', '104.18.', '104.19.', '104.20.', '104.21.',
        '104.22.', '104.23.', '104.24.', '104.25.', '104.26.', '104.27.',
        '104.28.', '104.29.', '104.30.', '104.31.'
    ];
    return cloudflareIPRanges.some(prefix => ip.startsWith(prefix));
}

async function detectCloudflare(domainOrIP) {
    let cloudflareDomainsOrIPs = [];
    let ip;
    let subdomains = [];

    if (!isValidIP(domainOrIP)) {
        ip = await resolveDNS(domainOrIP);
        subdomains = (await findSubdomains(domainOrIP)).split("\n");
    } else {
        ip = domainOrIP;
    }

    if (!ip) return "Could not resolve domain or IP.";

    for (const subdomain of subdomains) {
        const resolvedIP = await resolveDNS(subdomain);
        if (isCloudflareIP(resolvedIP)) {
            cloudflareDomainsOrIPs.push(subdomain);
        }
    }

    if (isCloudflareIP(ip)) {
        cloudflareDomainsOrIPs.push(domainOrIP);
    }

    return cloudflareDomainsOrIPs.join("\n") || "No Cloudflare domains or IPs found.";
}

async function getDNSRecords(domain) {
    const recordTypes = ['A', 'AAAA', 'MX', 'NS', 'TXT', 'CNAME'];
    let records = "";

    for (const recordType of recordTypes) {
        const dnsRecords = await resolveDNS(domain, recordType);
        if (dnsRecords) {
            records += `${recordType}: ${dnsRecords}\n`;
        }
    }

    return records || "No DNS records found.";
}

async function ipToHostname(ip) {
    try {
        const hostname = await resolveDNS(ip, 'PTR');
        return hostname || "Could not resolve IP.";
    } catch (error) {
        return "Error resolving IP: " + error.message;
    }
}

async function hostnameToIP(hostname) {
    try {
        const ip = await resolveDNS(hostname);
        return ip || "Could not resolve hostname.";
    } catch (error) {
        return "Error resolving hostname: " + error.message;
    }
}

function isValidIP(value) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(value);
}
