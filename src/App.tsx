import { useState } from 'react'
import { ChessBoard } from './components/ChessBoard'

type Lesson = 'pawn' | 'mate-one'

const worlds = [
  { icon: '♟️', title: 'Làng Tốt', desc: 'Luật chơi, giá trị quân và cách nhìn bàn cờ', lessons: 8, status: 'Đang học' },
  { icon: '♞', title: 'Rừng Mã', desc: 'Đòn đôi, quân bị treo và những cú nhảy bất ngờ', lessons: 10, status: 'Khóa' },
  { icon: '♝', title: 'Đền Tượng', desc: 'Ghim, xiên và đòn tấn công đường chéo', lessons: 10, status: 'Khóa' },
  { icon: '♜', title: 'Pháo Đài Xe', desc: 'Cột mở, hàng ngang và tàn cuộc Xe', lessons: 12, status: 'Khóa' },
  { icon: '♛', title: 'Tháp Hậu', desc: 'Phối hợp chiến thuật và tính toán nhiều nước', lessons: 12, status: 'Khóa' },
  { icon: '♚', title: 'Đấu Trường Vua', desc: 'Chiến lược, khai cuộc và thử thách tổng hợp', lessons: 12, status: 'Khóa' },
]

const checklist = [
  'Đối thủ vừa đi nước đó để làm gì?',
  'Vua của mình có an toàn không?',
  'Có quân nào của mình đang bị tấn công?',
  'Mình có nước chiếu nào?',
  'Mình có thể ăn quân nào?',
  'Mình có thể tạo đe dọa nào?',
]

export function App() {
  const [activeLesson, setActiveLesson] = useState<Lesson>('pawn')
  const [xp, setXp] = useState(120)
  const [completed, setCompleted] = useState<Lesson[]>([])

  const activeCompleted = completed.includes(activeLesson)
  const allDone = completed.includes('pawn') && completed.includes('mate-one')

  function reward(key: Lesson, amount: number) {
    if (completed.includes(key)) return
    setCompleted((items) => [...items, key])
    setXp((value) => value + amount)
  }

  function goToLesson(lesson: Lesson) {
    setActiveLesson(lesson)
    requestAnimationFrame(() => document.querySelector('#bai-hoc')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">♞</span><span>ChessQuest</span></div>
        <nav>
          <a className="active" href="#hanh-trinh">Hành trình</a>
          <a href="#bai-hoc">Bài học</a>
          <a href="#luyen-tap">Luyện tập</a>
          <a href="#tien-do">Tiến độ</a>
        </nav>
        <div className="xp-pill">⭐ {xp} XP</div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">HỌC CỜ VUA TỪNG BƯỚC</span>
          <h1>Biến mỗi bài học thành<br/><em>một cuộc phiêu lưu.</em></h1>
          <p>Học đúng nền tảng, luyện chiến thuật, hình thành thói quen suy nghĩ và tiến bộ qua từng thử thách.</p>
          <div className="hero-actions">
            <a className="primary hero-link" href="#bai-hoc">Tiếp tục bài học →</a>
            <button className="secondary" onClick={() => goToLesson('mate-one')}>Luyện puzzle</button>
          </div>
        </div>
        <div className="mission-card">
          <div className="mission-title">Nhiệm vụ hôm nay</div>
          <div className="mission-big">{completed.length} / 2</div>
          <div className="progress"><span style={{width:`${Math.min(100, completed.length * 50)}%`}} /></div>
          <p>{allDone ? '🎉 Hoàn thành nhiệm vụ hôm nay!' : 'Hoàn thành bài Tốt và puzzle chiếu hết để nhận XP.'}</p>
        </div>
      </section>

      <section id="hanh-trinh" className="section">
        <div className="section-heading">
          <div><span className="eyebrow">BẢN ĐỒ HỌC TẬP</span><h2>Hành trình của con</h2></div>
          <div className="level-chip">Cấp 1 · Tân binh</div>
        </div>
        <div className="world-grid">
          {worlds.map((world, index) => (
            <article className={`world-card ${index === 0 ? 'current' : 'locked'}`} key={world.title}>
              <div className="world-icon">{world.icon}</div>
              <div className="world-number">CHẶNG {index + 1}</div>
              <h3>{world.title}</h3>
              <p>{world.desc}</p>
              <div className="world-footer"><span>{world.lessons} bài học</span><span>{world.status}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section id="bai-hoc" className="lesson-section">
        <div className="lesson-sidebar">
          <span className="eyebrow">LÀNG TỐT · BÀI TƯƠNG TÁC</span>
          <h2>Học bằng cách tự đi quân</h2>
          <p>Không chỉ đọc lý thuyết. Con phải tự chọn quân và đi nước đúng trên bàn cờ.</p>

          <div className="lesson-tabs">
            <button className={activeLesson === 'pawn' ? 'active' : ''} onClick={() => goToLesson('pawn')}>
              <strong>{completed.includes('pawn') ? '✓ ' : ''}1. Tốt đi như thế nào?</strong><span>+20 XP</span>
            </button>
            <button className={activeLesson === 'mate-one' ? 'active' : ''} onClick={() => goToLesson('mate-one')}>
              <strong>{completed.includes('mate-one') ? '✓ ' : ''}2. Chiếu hết trong 1 nước</strong><span>+30 XP</span>
            </button>
          </div>

          {activeLesson === 'pawn' ? (
            <div className="lesson-note"><strong>Ghi nhớ</strong><p>Tốt đi thẳng nhưng ăn chéo. Ở nước đầu tiên, Tốt được đi 1 hoặc 2 ô nếu phía trước không bị chặn.</p></div>
          ) : (
            <div className="lesson-note"><strong>Mục tiêu</strong><p>Tìm nước khiến Vua đen đang bị chiếu và không còn ô hợp lệ để chạy, bắt quân chiếu hoặc che chắn.</p></div>
          )}

          {activeCompleted && activeLesson === 'pawn' && (
            <button className="next-lesson" onClick={() => goToLesson('mate-one')}>Bài tiếp theo: Chiếu hết trong 1 nước →</button>
          )}
          {activeCompleted && activeLesson === 'mate-one' && (
            <div className="lesson-complete">🏆 Tuyệt vời! Con đã hoàn thành các bài tương tác hiện có của Làng Tốt.</div>
          )}
        </div>

        <ChessBoard
          key={activeLesson}
          mode={activeLesson}
          onSolved={() => reward(activeLesson, activeLesson === 'pawn' ? 20 : 30)}
        />
      </section>

      <section id="luyen-tap" className="thinking-section">
        <div className="thinking-copy">
          <span className="eyebrow">THÓI QUEN QUAN TRỌNG NHẤT</span>
          <h2>Trước khi đi quân,<br/>hãy suy nghĩ như một kỳ thủ.</h2>
          <p>ChessQuest sẽ nhắc con theo checklist ở giai đoạn đầu, sau đó giảm dần gợi ý để con hình thành phản xạ độc lập.</p>
          <div className="cct"><strong>CCT</strong><span>Chiếu</span><span>Ăn quân</span><span>Đe dọa</span></div>
        </div>
        <ol className="checklist">{checklist.map((item, i) => <li key={item}><span>{i+1}</span>{item}</li>)}</ol>
      </section>

      <section id="tien-do" className="stats">
        <div><strong>{completed.length}</strong><span>Bài tương tác hoàn thành</span></div>
        <div><strong>{completed.includes('mate-one') ? 1 : 0}</strong><span>Puzzle đã giải</span></div>
        <div><strong>{xp}</strong><span>Tổng XP</span></div>
        <div><strong>{allDone ? '100%' : completed.length === 1 ? '50%' : '0%'}</strong><span>Nhiệm vụ hôm nay</span></div>
      </section>

      <footer>ChessQuest · Học cờ vua đúng cách, mỗi ngày một chút. ♟️</footer>
    </main>
  )
}
