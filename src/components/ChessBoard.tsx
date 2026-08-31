import { useMemo, useState } from 'react'

type Square = {
  name: string
  piece?: string
}

type Props = {
  mode?: 'mate-one' | 'pawn'
  onSolved?: () => void
}

const files = ['a','b','c','d','e','f','g','h']

function squareName(row: number, col: number) {
  return `${files[col]}${8-row}`
}

export function ChessBoard({ mode = 'mate-one', onSolved }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  const [message, setMessage] = useState(mode === 'mate-one' ? 'Trắng đi trước. Tìm nước chiếu hết trong 1 nước.' : 'Chọn Tốt trắng ở e2 và đưa nó tiến lên.')

  const pieces = useMemo<Record<string,string>>(() => mode === 'mate-one'
    ? { h8:'♚', g6:'♔', f7:'♕' }
    : { e2:'♙', e7:'♟', e1:'♔', e8:'♚' }, [mode])

  const [movedPieces, setMovedPieces] = useState<Record<string,string>>(pieces)

  function reset() {
    setSelected(null)
    setSolved(false)
    setMovedPieces(pieces)
    setMessage(mode === 'mate-one' ? 'Trắng đi trước. Tìm nước chiếu hết trong 1 nước.' : 'Chọn Tốt trắng ở e2 và đưa nó tiến lên.')
  }

  function handleSquare(name: string) {
    if (solved) return

    if (!selected) {
      if (!movedPieces[name]) {
        setMessage('Hãy chọn một quân trắng trước nhé.')
        return
      }
      setSelected(name)
      setMessage(`Đã chọn ${name}. Bây giờ chọn ô muốn đi tới.`)
      return
    }

    const correct = mode === 'mate-one'
      ? selected === 'f7' && name === 'g7'
      : selected === 'e2' && (name === 'e3' || name === 'e4')

    if (correct) {
      const next = { ...movedPieces }
      next[name] = next[selected]
      delete next[selected]
      setMovedPieces(next)
      setSelected(null)
      setSolved(true)
      setMessage(mode === 'mate-one' ? '🎉 Chính xác! Qg7# — Hậu được Vua bảo vệ nên Vua đen không thể bắt.' : '🎉 Đúng rồi! Ở nước đầu tiên, Tốt có thể tiến 1 hoặc 2 ô.')
      onSolved?.()
      return
    }

    setSelected(null)
    setMessage(mode === 'mate-one' ? 'Chưa đúng. Gợi ý: hãy tìm một nước Hậu vừa chiếu Vua, vừa được Vua trắng bảo vệ.' : 'Chưa đúng. Tốt đi thẳng về phía trước và không đi lùi.')
  }

  const squares: Square[] = Array.from({ length: 64 }, (_, index) => {
    const row = Math.floor(index / 8)
    const col = index % 8
    const name = squareName(row, col)
    return { name, piece: movedPieces[name] }
  })

  return (
    <div className="board-module">
      <div className="board-status" data-solved={solved}>{message}</div>
      <div className="chess-board" role="grid" aria-label="Bàn cờ tương tác">
        {squares.map((square, index) => {
          const row = Math.floor(index / 8)
          const col = index % 8
          const dark = (row + col) % 2 === 1
          return (
            <button
              key={square.name}
              className={`board-square ${dark ? 'dark' : 'light'} ${selected === square.name ? 'selected' : ''}`}
              onClick={() => handleSquare(square.name)}
              aria-label={`${square.name}${square.piece ? ` ${square.piece}` : ''}`}
            >
              <span className="piece">{square.piece}</span>
              {col === 0 && <small className="rank-label">{8-row}</small>}
              {row === 7 && <small className="file-label">{files[col]}</small>}
            </button>
          )
        })}
      </div>
      <button className="reset-board" onClick={reset}>↻ Làm lại</button>
    </div>
  )
}
