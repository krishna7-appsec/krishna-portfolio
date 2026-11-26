import img0 from '../../assets/illustrations/network-security.svg'
import img1 from '../../assets/illustrations/firewall.svg'
import img2 from '../../assets/illustrations/encryption.svg'
import img3 from '../../assets/illustrations/cloud-security.svg'
import img4 from '../../assets/illustrations/forensics-and-threat-intel.svg'
import img5 from '../../assets/illustrations/api-security.svg'

// Migrated from the original static site (index.html). Six gallery illustrations, rebuilt as standalone SVG files.
// Content is preserved as written; deviations are listed in docs/MIGRATION.md.

export interface Illustration { id: string; title: string; caption: string; alt: string; src: string }

export const illustrations: readonly Illustration[] = [
  { id: 'network-security', title: "Network security", caption: "Nodes, links, and the one path an attacker takes.", alt: "Network diagram: five connected nodes, with one red dashed path showing the route an attacker could take.", src: img0 },
  { id: 'firewall', title: "Firewall", caption: "Rules at the edge decide what gets through.", alt: "A brick wall representing a firewall blocks two red connections while one allowed green connection passes.", src: img1 },
  { id: 'encryption', title: "Encryption", caption: "Readable data in, ciphertext out.", alt: "A padlock beside a stream of binary digits and the label AES-256-GCM, representing encrypted data.", src: img2 },
  { id: 'cloud-security', title: "Cloud security", caption: "Identity and configuration are the new perimeter.", alt: "A cloud containing a shield with a check mark, representing cloud security controls.", src: img3 },
  { id: 'forensics-and-threat-intel', title: "Forensics and threat intel", caption: "Follow the evidence back to the source.", alt: "A magnifying glass over lines of data with an indicator-of-compromise label, representing digital forensics and threat intelligence.", src: img4 },
  { id: 'api-security', title: "API security", caption: "Every endpoint is a door. Check every lock.", alt: "Curly braces beside an API request answered with 403 Forbidden and an ownership check, representing API authorization.", src: img5 },
]
