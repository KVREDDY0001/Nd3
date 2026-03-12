import { exterior } from '../../data/projects'
import { useNavigate } from 'react-router-dom'

export default function Interior() {
  const navigate = useNavigate()

  return (
    <main style={{ padding: 80 }}>
      {exterior.map(p => (
        <div key={p.name} style={{ marginBottom: 80 }}>
          <div style={{ overflow: 'hidden' }}>
            <img
              src={p.img}
              style={{ width: '100%', transition: 'transform .6s ease' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <h2 style={{ fontFamily: 'GTPressura', letterSpacing: '0.15em' }}>{p.name}</h2>
          <button onClick={() => navigate(`/confirm?url=${encodeURIComponent(p.url)}`)}>
            Enter Virtual Tour
          </button>
        </div>
      ))}
    </main>
  )
}