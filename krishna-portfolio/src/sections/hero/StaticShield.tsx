/** Lightweight static hero visual: used on phones, with reduced motion, without WebGL, or while the 3D scene loads. */
export default function StaticShield() {
  const nodes: [number, number][] = [[200, 70], [120, 120], [280, 120], [150, 200], [250, 200], [200, 150], [200, 260]]
  const links: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 5], [2, 5], [3, 5], [4, 5], [3, 6], [4, 6], [5, 6], [0, 5]]
  return (
    <svg viewBox="0 0 400 340" role="img" aria-label="A shield containing a network of connected nodes" className="h-full w-full">
      <path d="M200 20l140 48v80c0 78-58 124-140 152C118 272 60 226 60 148V68z" fill="rgba(0,245,160,0.05)" stroke="#00F5A0" strokeOpacity="0.6" strokeWidth="2" />
      {links.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke="#00B8FF" strokeOpacity="0.45" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 5 ? 9 : 5} fill={i === 5 ? '#00F5A0' : '#080B10'} stroke="#00F5A0" strokeWidth="2" />
      ))}
    </svg>
  )
}
