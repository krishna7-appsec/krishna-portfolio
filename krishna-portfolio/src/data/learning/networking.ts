import type { NetworkTopic } from '../../types'

// Migrated from the original static site (index.html). Networking course, 15 topics.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const networkTopics: readonly NetworkTopic[] = [
  {
    "id": "introduction-to-computer-networking",
    "title": "Introduction to computer networking",
    "explanation": "A network is devices exchanging data using agreed rules called protocols. Switches connect devices inside a LAN; routers connect separate networks.",
    "example": "Your phone and laptop talk to the home router, which talks to your ISP, which reaches the internet.",
    "diagram": "Phone ─ Wi-Fi AP ─ Router ─ ISP ─ Internet",
    "command": "ping example.com",
    "takeaway": "Networking is agreed rules for moving bits.",
    "quiz": {
      "question": "Which device connects different networks?",
      "options": [
        "Switch",
        "Router",
        "Cable"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "the-osi-model",
    "title": "The OSI model",
    "explanation": "Seven layers split the job: 7 Application, 6 Presentation, 5 Session, 4 Transport, 3 Network, 2 Data Link, 1 Physical. Use the explorer above to see protocols and devices per layer.",
    "example": "A web request: HTTP at 7, TLS around 6, TCP at 4, IP at 3, Ethernet at 2, signals at 1.",
    "diagram": "7 App · 6 Pres · 5 Sess · 4 Trans · 3 Net · 2 Link · 1 Phys",
    "command": "tcpdump -i eth0 -c 5",
    "takeaway": "Layers help you place a fault or an attack.",
    "quiz": {
      "question": "At which OSI layer does IP work?",
      "options": [
        "2",
        "3",
        "4"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "tcp-ip-model",
    "title": "TCP/IP model",
    "explanation": "The practical stack has four layers: Link, Internet (IP), Transport (TCP/UDP), Application. It merges OSI’s top three and bottom two layers.",
    "example": "Browser (application) → TCP (transport) → IP (internet) → Wi-Fi (link).",
    "diagram": "Application → Transport → Internet → Link",
    "command": "ss -tn",
    "takeaway": "OSI teaches; TCP/IP is what runs.",
    "quiz": {
      "question": "How many layers does the TCP/IP model have?",
      "options": [
        "4",
        "5",
        "7"
      ],
      "answerIndex": 0
    }
  },
  {
    "id": "ip-addressing-ipv4-and-ipv6",
    "title": "IP addressing: IPv4 and IPv6",
    "explanation": "IPv4 addresses are 32 bits (192.168.1.10). IPv6 addresses are 128 bits written in hex (2001:db8::1), created because IPv4 ran short.",
    "example": "Home devices use private IPv4 addresses; many ISPs also provide IPv6.",
    "diagram": "IPv4: 32-bit, 4 octets  |  IPv6: 128-bit, 8 hex groups",
    "command": "ip addr   (Linux)  ·  ipconfig   (Windows)",
    "takeaway": "Learn both; firewall rules often forget IPv6.",
    "quiz": {
      "question": "How many bits is an IPv6 address?",
      "options": [
        "32",
        "64",
        "128"
      ],
      "answerIndex": 2
    }
  },
  {
    "id": "subnetting-and-cidr",
    "title": "Subnetting and CIDR",
    "explanation": "CIDR writes a network as address/prefix; the prefix counts the network bits. A /24 has 256 addresses (254 usable); a /26 has 64 (62 usable). Try the calculator above.",
    "example": "192.168.1.0/26 covers 192.168.1.0 to 192.168.1.63.",
    "diagram": "192.168.1.0/24 → split → four /26 networks",
    "command": "ipcalc 192.168.1.0/26",
    "takeaway": "Each extra prefix bit halves the network.",
    "quiz": {
      "question": "How many addresses are in a /26?",
      "options": [
        "32",
        "64",
        "128"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "mac-addresses-and-arp",
    "title": "MAC addresses and ARP",
    "explanation": "A MAC address identifies an interface on the local link. ARP asks who owns an IP so a host can learn the MAC to send frames to.",
    "example": "Your laptop ARPs for the router’s IP to learn its MAC.",
    "diagram": "Who has 192.168.1.1?  →  it is at aa:bb:cc:dd:ee:ff",
    "command": "arp -a   ·   ip neigh",
    "takeaway": "ARP has no authentication, so ARP spoofing works on a LAN.",
    "quiz": {
      "question": "ARP maps…",
      "options": [
        "IP to MAC",
        "Domain to IP",
        "Port to process"
      ],
      "answerIndex": 0
    }
  },
  {
    "id": "dns-and-dhcp",
    "title": "DNS and DHCP",
    "explanation": "DNS turns names into IP addresses. DHCP gives a new device its IP, gateway, and DNS server in four steps: Discover, Offer, Request, Acknowledge.",
    "example": "Typing example.com triggers a DNS lookup; joining Wi-Fi triggers DHCP.",
    "diagram": "DHCP: Discover → Offer → Request → Ack",
    "command": "dig example.com   ·   nslookup example.com",
    "takeaway": "Whoever controls DNS or DHCP can steer clients.",
    "quiz": {
      "question": "DNS converts…",
      "options": [
        "Names to IPs",
        "IPs to MACs",
        "Passwords to hashes"
      ],
      "answerIndex": 0
    }
  },
  {
    "id": "tcp-vs-udp",
    "title": "TCP vs UDP",
    "explanation": "TCP is connection-oriented and reliable: a three-way handshake, then retransmission of lost data. UDP is connectionless and fast with no delivery guarantee.",
    "example": "Web pages and SSH use TCP; DNS queries, calls, and games often use UDP.",
    "diagram": "TCP: SYN → SYN-ACK → ACK   |   UDP: send, no handshake",
    "command": "ss -tuln",
    "takeaway": "TCP for correctness, UDP for speed.",
    "quiz": {
      "question": "Which protocol uses a three-way handshake?",
      "options": [
        "UDP",
        "TCP",
        "ARP"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "common-ports-and-protocols",
    "title": "Common ports and protocols",
    "explanation": "A port number selects the service on a host. Open ports are attack surface, so each one needs a reason.",
    "example": "Port 443 on a web server serves HTTPS.",
    "diagram": "21 FTP · 22 SSH · 23 Telnet · 25 SMTP · 53 DNS · 80 HTTP · 443 HTTPS · 3389 RDP",
    "command": "ss -tuln   ·   netstat -an",
    "takeaway": "Close ports you do not need.",
    "quiz": {
      "question": "HTTPS normally uses port…",
      "options": [
        "80",
        "443",
        "22"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "http-and-https",
    "title": "HTTP and HTTPS",
    "explanation": "HTTP is request and response with methods (GET, POST) and status codes (200, 403). HTTPS wraps HTTP in TLS for encryption and server authentication.",
    "example": "A 403 means the server understood the request and refuses it.",
    "diagram": "Client → GET /page → Server → 200 OK",
    "command": "curl -I https://example.com",
    "takeaway": "HTTPS protects data in transit, not a vulnerable application.",
    "quiz": {
      "question": "Does HTTPS prevent SQL injection?",
      "options": [
        "Yes",
        "No"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "routing-and-switching",
    "title": "Routing and switching",
    "explanation": "Switches forward frames by MAC address inside a LAN. Routers forward packets by IP address between networks using a routing table and a default gateway.",
    "example": "Traffic to the internet goes to the default gateway first.",
    "diagram": "Host → Switch (MAC) → Router (IP) → next hop",
    "command": "ip route   ·   route print",
    "takeaway": "Switches are layer 2, routers layer 3.",
    "quiz": {
      "question": "Which device forwards by IP address?",
      "options": [
        "Switch",
        "Router"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "firewalls-and-network-segmentation",
    "title": "Firewalls and network segmentation",
    "explanation": "A firewall allows or blocks traffic by rules (addresses, ports, connection state). Segmentation splits a network into zones such as users, servers, and a DMZ so one breach does not reach everything.",
    "example": "Web servers sit in a DMZ; databases sit in a private segment.",
    "diagram": "Internet → Firewall → DMZ → Firewall → Internal",
    "command": "sudo iptables -L -n",
    "takeaway": "Default deny, then allow only what is needed.",
    "quiz": {
      "question": "Segmentation mainly limits…",
      "options": [
        "Speed",
        "Blast radius"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "proxy-servers-and-vpns",
    "title": "Proxy servers and VPNs",
    "explanation": "A proxy forwards requests for a client and can filter or log them. A VPN builds an encrypted tunnel to another network so traffic crosses untrusted links safely.",
    "example": "Companies use VPNs for remote access and proxies for web filtering.",
    "diagram": "Client ═ encrypted tunnel ═ VPN gateway → network",
    "command": "curl -x http://proxy.example:8080 https://example.com",
    "takeaway": "A VPN protects the path to its endpoint, not what happens after it.",
    "quiz": {
      "question": "A VPN mainly provides…",
      "options": [
        "An encrypted tunnel",
        "A faster line"
      ],
      "answerIndex": 0
    }
  },
  {
    "id": "nat-network-address-translation",
    "title": "NAT: network address translation",
    "explanation": "NAT lets many private addresses share one public address by rewriting addresses and ports. Private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
    "example": "Your home router translates every device to its one public IP.",
    "diagram": "192.168.1.5:5000 → NAT → 203.0.113.7:40001",
    "command": "ip addr show",
    "takeaway": "NAT is not a security control, though it blocks unsolicited inbound traffic by default.",
    "quiz": {
      "question": "Which is a private range?",
      "options": [
        "8.8.8.0/24",
        "192.168.0.0/16"
      ],
      "answerIndex": 1
    }
  },
  {
    "id": "basic-network-troubleshooting",
    "title": "Basic network troubleshooting",
    "explanation": "Work up the layers: is the link up, do you have an IP, is the gateway reachable, does DNS resolve, is the port open? Each tool answers one question.",
    "example": "Site will not load: ping the gateway, ping 8.8.8.8, then ping the domain to separate routing from DNS.",
    "diagram": "Cable → IP → Gateway → DNS → Service",
    "command": "ping · traceroute · nslookup · ss -tuln",
    "takeaway": "Change one thing at a time and test the lower layer first.",
    "quiz": {
      "question": "Ping works by IP but not by name. Most likely…",
      "options": [
        "A DNS problem",
        "An unplugged cable"
      ],
      "answerIndex": 0
    }
  }
]
