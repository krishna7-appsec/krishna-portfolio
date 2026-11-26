import type { PacketNode } from '../../types'

// Migrated from the original static site (index.html). Packet-flow devices.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export const packetNodes: readonly PacketNode[] = [
  {
    "id": "client",
    "icon": "💻",
    "name": "Client",
    "description": "Starts the request and wraps data in TCP, IP, and Ethernet headers."
  },
  {
    "id": "switch",
    "icon": "🔀",
    "name": "Switch",
    "description": "Layer 2. Forwards frames by MAC address inside the LAN."
  },
  {
    "id": "router",
    "icon": "📡",
    "name": "Router",
    "description": "Layer 3. Forwards packets by IP address toward the destination network."
  },
  {
    "id": "firewall",
    "icon": "🧱",
    "name": "Firewall",
    "description": "Allows, blocks, or logs traffic by address, port, and connection state."
  },
  {
    "id": "server",
    "icon": "🖥️",
    "name": "Server",
    "description": "Unwraps each layer and hands the data to the application."
  }
]
