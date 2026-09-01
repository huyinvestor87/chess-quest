import { useState } from 'react'
import { ChessBoard } from './components/ChessBoard'

type Lesson = 'pawn' | 'mate-one' | 'cct-tip'

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
  const [tipAnswer, setTipAnswer] = useState<string | null>(null)

  const activeCompleted = completed.includes(activeLesson)
  const allDone = completed.includes('pawn') && completed.includes('mate-one') && completed.includes('cct-tip')

  function reward(key: Lesson, amount: number) {
    if (completed.includes(key)) return
    setCompleted((items) => [...items, key])
    setXp((value) => value + amount)
  }

  function goToLesson(lesson: Lesson) {
    setActiveLesson(lesson)
    requestAnimationFrame(() => document.querySelector('#bai-hoc')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  function answerTip(answer: string) {
    setTipAnswer(answer)
    if (answer === 'checks') reward('cct-tip', 20)
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
          <div className="mission-big">{completed.length} / 3</div>
          <div className="progress"><span style={{width:`${Math.min(100, completed.length / 3 * 100)}%`}} /></div>
          <p>{allDone ? '🎉 Hoàn thành nhiệm vụ hôm nay!' : 'Hoàn thành 2 bài bàn cờ và Tip CCT để nhận XP.'}</p>
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
          <p>Không chỉ đọc lý thuyết. Con phải tự chọn quân, đi nước hợp lệ và áp dụng tip tư duy.</p>

          <div className="lesson-tabs">
            <button className={activeLesson === 'pawn' ? 'active' : ''} onClick={() => goToLesson('pawn')}>
              <strong>{completed.includes('pawn') ? '✓ ' : ''}1. Tốt đi như thế nào?</strong><span>+20 XP</span>
            </button>
            <button className={activeLesson === 'mate-one' ? 'active' : ''} onClick={() => goToLesson('mate-one')}>
              <strong>{completed.includes('mate-one') ? '✓ ' : ''}2. Chiếu hết trong 1 nước</strong><span>+30 XP</span>
            </button>
            <button className={activeLesson === 'cct-tip' ? 'active' : ''} onClick={() => goToLesson('cct-tip')}>
              <strong>{completed.includes('cct-tip') ? '✓ ' : ''}3. Tip: CCT trước khi đi quân</strong><span>+20 XP</span>
            </button>
          </div>

          {activeLesson === 'pawn' && (
            <div className="lesson-note"><strong>Ghi nhớ</strong><p>Tốt đi thẳng nhưng ăn chéo. Ở nước đầu tiên, Tốt được đi 1 hoặc 2 ô nếu phía trước không bị chặn.</p></div>
          )}
          {activeLesson === 'mate-one' && (
            <div className="lesson-note"><strong>Mục tiêu</strong><p>Chọn Hậu, nhìn các ô được đánh dấu là nước đi hợp lệ, rồi tìm nước chiếu hết thật sự.</p></div>
          )}
          {activeLesson === 'cct-tip' && (
            <div className="lesson-note"><strong>CCT</strong><p>Mỗi lượt, hãy tìm theo thứ tự: Chiếu → Ăn quân → Đe dọa. Đây là một thói quen giúp giảm bỏ sót chiến thuật.</p></div>
          )}

          {activeCompleted && activeLesson === 'pawn' && (
            <button className="next-lesson" onClick={() => goToLesson('mate-one')}>Bài tiếp theo: Chiếu hết trong 1 nước →</button>
          )}
          {activeCompleted && activeLesson === 'mate-one' && (
            <button className="next-lesson" onClick={() => goToLesson('cct-tip')}>Học Tip tiếp theo: CCT →</button>
          )}
          {activeCompleted && activeLesson === 'cct-tip' && (
            <div className="lesson-complete">🏆 Tuyệt vời! Con đã hoàn thành 3 bài đầu. Bài tiếp theo sẽ mở rộng sang quân bị treo và đòn đôi.</div>
          )}
        </div>

        {activeLesson === 'cct-tip' ? (
          <div className="tip-challenge">
            <span className="eyebrow">TIP NHANH</span>
            <h3>Trước khi nghĩ đến nước “hay”, nên tìm gì trước?</h3>
            <p>Chọn đáp án đúng theo nguyên tắc CCT.</p>
            <div className="tip-options">
              <button onClick={() => answerTip('develop')}>Phát triển quân bất kỳ</button>
              <button onClick={() => answerTip('checks')}>Các nước chiếu</button>
              <button onClick={() => answerTip('queen')}>Đưa Hậu ra sớm</button>
            </div>
            {tipAnswer && (
              <div className={`tip-result ${tipAnswer === 'checks' ? 'correct' : 'wrong'}`}>
                {tipAnswer === 'checks' ? '✓ Đúng! Trong CCT, hãy quét các nước Chiếu trước.' : 'Chưa đúng. Hãy nhớ thứ tự: Chiếu → Ăn quân → Đe dọa.'}
              </div>
            )}
          </div>
        ) : (
          <ChessBoard
            key={activeLesson}
            mode={activeLesson}
            onSolved={() => reward(activeLesson, activeLesson === 'pawn' ? 20 : 30)}
          />
        )}
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
        <div><strong>{Math.round(completed.length / 3 * 100)}%</strong><span>Nhiệm vụ hôm nay</span></div>
      </section>

      <footer>ChessQuest · Học cờ vua đúng cách, mỗi ngày một chút. ♟️</footer>
    </main>
  )
}
