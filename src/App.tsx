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
  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-mark">♞</span><span>ChessQuest</span></div>
        <nav>
          <a className="active" href="#hanh-trinh">Hành trình</a>
          <a href="#luyen-tap">Luyện tập</a>
          <a href="#tien-do">Tiến độ</a>
        </nav>
        <div className="xp-pill">⭐ 120 XP</div>
      </header>

      <section className="hero">
        <div>
          <span className="eyebrow">HỌC CỜ VUA TỪNG BƯỚC</span>
          <h1>Biến mỗi bài học thành<br/><em>một cuộc phiêu lưu.</em></h1>
          <p>Học đúng nền tảng, luyện chiến thuật, hình thành thói quen suy nghĩ và tiến bộ qua từng thử thách.</p>
          <div className="hero-actions">
            <button className="primary">Tiếp tục bài học →</button>
            <button className="secondary">Luyện puzzle</button>
          </div>
        </div>
        <div className="mission-card">
          <div className="mission-title">Nhiệm vụ hôm nay</div>
          <div className="mission-big">3 / 5</div>
          <div className="progress"><span style={{width:'60%'}} /></div>
          <p>Hoàn thành thêm 2 thử thách để giữ chuỗi học 4 ngày 🔥</p>
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

      <section id="luyen-tap" className="thinking-section">
        <div className="thinking-copy">
          <span className="eyebrow">THÓI QUEN QUAN TRỌNG NHẤT</span>
          <h2>Trước khi đi quân,<br/>hãy suy nghĩ như một kỳ thủ.</h2>
          <p>ChessQuest sẽ nhắc con theo checklist ở giai đoạn đầu, sau đó giảm dần gợi ý để con hình thành phản xạ độc lập.</p>
          <div className="cct"><strong>CCT</strong><span>Chiếu</span><span>Ăn quân</span><span>Đe dọa</span></div>
        </div>
        <ol className="checklist">
          {checklist.map((item, i) => <li key={item}><span>{i+1}</span>{item}</li>)}
        </ol>
      </section>

      <section id="tien-do" className="stats">
        <div><strong>8</strong><span>Bài đã hoàn thành</span></div>
        <div><strong>42</strong><span>Puzzle đã giải</span></div>
        <div><strong>4 🔥</strong><span>Ngày liên tiếp</span></div>
        <div><strong>82%</strong><span>Độ chính xác</span></div>
      </section>

      <footer>ChessQuest · Học cờ vua đúng cách, mỗi ngày một chút. ♟️</footer>
    </main>
  )
}
