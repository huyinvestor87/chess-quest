import { useMemo, useState } from 'react'
import { Chess, type Square as ChessSquare } from 'chess.js'

type Square = {
  name: string
  piece?: string
}

type Props = {
  mode?: 'mate-one' | 'pawn'
  onSolved?: () => void
}

const files = ['a','b','c','d','e','f','g','h']
const mateFen = '7k/5Q2/6K1/8/8/8/8/8 w - - 0 1'
const pawnFen = '4k3/4p3/8/8/8/8/4P3/4K3 w - - 0 1'

const pieceSymbols: Record<string, string> = {
  wk: '♔', wq: '♕', wr: '♖', wb: '♗', wn: '♘', wp: '♙',
  bk: '♚', bq: '♛', br: '♜', bb: '♝', bn: '♞', bp: '♟',
}

function squareName(row: number, col: number) {
  return `${files[col]}${8-row}`
}

function initialFen(mode: Props['mode']) {
  return mode === 'mate-one' ? mateFen : pawnFen
}

export function ChessBoard({ mode = 'mate-one', onSolved }: Props) {
  const [fen, setFen] = useState(() => initialFen(mode))
  const [selected, setSelected] = useState<string | null>(null)
  const [solved, setSolved] = useState(false)
  const [message, setMessage] = useState(mode === 'mate-one'
    ? 'Trắng đi trước. Chọn Hậu và tìm nước chiếu hết trong 1 nước.'
    : 'Chọn Tốt trắng ở e2 và đưa nó tiến lên.')

  const game = useMemo(() => new Chess(fen), [fen])

  const legalTargets = useMemo(() => {
    if (!selected) return new Set<string>()
    const moves = game.moves({ square: selected as ChessSquare, verbose: true })
    return new Set(moves.map((move) => move.to))
  }, [game, selected])

  const pieces = useMemo<Record<string, string>>(() => {
    const result: Record<string, string> = {}
    game.board().forEach((rank, row) => {
      rank.forEach((piece, col) => {
        if (!piece) return
        const name = squareName(row, col)
        result[name] = pieceSymbols[`${piece.color}${piece.type}`]
      })
    })
    return result
  }, [game])

  function reset() {
    setFen(initialFen(mode))
    setSelected(null)
    setSolved(false)
    setMessage(mode === 'mate-one'
      ? 'Trắng đi trước. Chọn Hậu và tìm nước chiếu hết trong 1 nước.'
      : 'Chọn Tốt trắng ở e2 và đưa nó tiến lên.')
  }

  function handleSquare(name: string) {
    if (solved) return

    if (!selected) {
      const piece = game.get(name as ChessSquare)
      if (!piece || piece.color !== 'w') {
        setMessage('Hãy chọn một quân Trắng trước nhé.')
        return
      }
      setSelected(name)
      const count = game.moves({ square: name as ChessSquare }).length
      setMessage(`Đã chọn ${name}. Có ${count} ô đi hợp lệ được đánh dấu.`)
      return
    }

    if (selected === name) {
      setSelected(null)
      setMessage('Đã bỏ chọn quân.')
      return
    }

    if (!legalTargets.has(name)) {
      setSelected(null)
      setMessage(mode === 'mate-one'
        ? 'Nước đó không hợp lệ cho Hậu. Hãy chọn lại và nhìn các ô được đánh dấu.'
        : 'Tốt không thể đi tới ô đó. Hãy thử e3 hoặc e4.')
      return
    }

    const next = new Chess(fen)
    next.move({ from: selected as ChessSquare, to: name as ChessSquare, promotion: 'q' })

    if (mode === 'mate-one') {
      if (!next.isCheckmate()) {
        setSelected(null)
        setMessage('Nước đi hợp lệ, nhưng chưa chiếu hết. Hãy thử lại từ thế cờ ban đầu.')
        return
      }
      setFen(next.fen())
      setSelected(null)
      setSolved(true)
      setMessage('🎉 Chính xác! Qg7# — đây là nước đi hợp lệ và chess.js xác nhận Vua đen đã bị chiếu hết.')
      onSolved?.()
      return
    }

    if (selected === 'e2' && (name === 'e3' || name === 'e4')) {
      setFen(next.fen())
      setSelected(null)
      setSolved(true)
      setMessage('🎉 Đúng rồi! Ở nước đầu tiên, Tốt có thể tiến 1 hoặc 2 ô nếu phía trước trống.')
      onSolved?.()
      return
    }

    setSelected(null)
    setMessage('Hãy chọn Tốt ở e2 và đi tới e3 hoặc e4.')
  }

  const squares: Square[] = Array.from({ length: 64 }, (_, index) => {
    const row = Math.floor(index / 8)
    const col = index % 8
    const name = squareName(row, col)
    return { name, piece: pieces[name] }
  })

  return (
    <div className="board-module">
      <div className="board-status" data-solved={solved}>{message}</div>
      <div className="chess-board" role="grid" aria-label="Bàn cờ tương tác">
        {squares.map((square, index) => {
          const row = Math.floor(index / 8)
          const col = index % 8
          const dark = (row + col) % 2 === 1
          const legal = legalTargets.has(square.name)
          return (
            <button
              key={square.name}
              className={`board-square ${dark ? 'dark' : 'light'} ${selected === square.name ? 'selected' : ''} ${legal ? 'legal-target' : ''}`}
              onClick={() => handleSquare(square.name)}
              aria-label={`${square.name}${square.piece ? ` ${square.piece}` : ''}`}
            >
              <span className="piece">{square.piece}</span>
              {legal && <span className="move-dot" aria-hidden="true" />}
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
