import type { OsiLayer } from '../../types'

// Migrated from the original static site (index.html). OSI model, 7 layers.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const osiLayers: readonly OsiLayer[] = [
  {
    "number": 7,
    "name": "Application",
    "unit": "Data",
    "protocols": "HTTP, DNS, SMTP, SSH",
    "devices": "Proxies, WAFs",
    "attacks": "SQL injection, XSS"
  },
  {
    "number": 6,
    "name": "Presentation",
    "unit": "Data",
    "protocols": "TLS (roughly), encoding, compression",
    "devices": "—",
    "attacks": "Weak TLS ciphers"
  },
  {
    "number": 5,
    "name": "Session",
    "unit": "Data",
    "protocols": "RPC, NetBIOS",
    "devices": "—",
    "attacks": "Session hijacking"
  },
  {
    "number": 4,
    "name": "Transport",
    "unit": "Segment / datagram",
    "protocols": "TCP, UDP",
    "devices": "Stateful firewalls",
    "attacks": "SYN flood, port scans"
  },
  {
    "number": 3,
    "name": "Network",
    "unit": "Packet",
    "protocols": "IP, ICMP",
    "devices": "Routers",
    "attacks": "IP spoofing"
  },
  {
    "number": 2,
    "name": "Data Link",
    "unit": "Frame",
    "protocols": "Ethernet, ARP, Wi-Fi",
    "devices": "Switches",
    "attacks": "ARP spoofing, MAC flooding"
  },
  {
    "number": 1,
    "name": "Physical",
    "unit": "Bits",
    "protocols": "Cables, radio signals",
    "devices": "Hubs, repeaters",
    "attacks": "Cable tapping, jamming"
  }
]
