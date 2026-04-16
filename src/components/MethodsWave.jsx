export default function MethodsWave({ hoveredIndex, onHover }) {
  const peaks = [
    { 
      // Recherches: Sharp and early
      d: "M0 180 L40 160 L100 40 L180 120 L260 140 L340 180 Z", 
      color: "#517bfc", opacity: 0.6 
    },
    { 
      // Analyses: More jagged
      d: "M140 180 L220 150 L300 130 L380 50 L460 90 L540 130 L620 180 Z", 
      color: "#6267fc", opacity: 0.65 
    },
    { 
      // Conception: CENTRAL CONVERGENCE - Tallest and most complex
      d: "M320 180 L440 140 L500 20 L580 120 L720 140 L840 180 Z", 
      color: "#7352fe", opacity: 0.8 
    },
    { 
      // Production: Smoother shoulder
      d: "M560 180 L680 150 L800 45 L880 110 L940 150 L1000 180 Z", 
      color: "#7d3ffe", opacity: 0.75 
    },
    { 
      // Evaluation: Compact and late
      d: "M780 180 L860 140 L940 70 L980 100 L1000 150 L1000 180 Z", 
      color: "#8728fe", opacity: 0.7 
    },
  ];

  return (
    <svg
      className="methods-wave"
      viewBox="0 0 1000 180"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      tabIndex="-1"
    >
      <defs>
        <filter id="activeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feOffset dx="0" dy="2" result="offsetBlur" />
          <feFlood floodColor="#7352fe" floodOpacity="0.3" result="offsetColor" />
          <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {peaks.map((peak, index) => (
        <path
          key={index}
          d={peak.d}
          fill={peak.color}
          opacity={hoveredIndex === null ? peak.opacity : hoveredIndex === index ? 1 : 0.08}
          onMouseEnter={() => onHover(index)}
          onMouseLeave={() => onHover(null)}
          filter={hoveredIndex === index ? "url(#activeShadow)" : "none"}
          style={{ 
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            mixBlendMode: 'multiply'
          }}
        />
      ))}
    </svg>
  );
}
