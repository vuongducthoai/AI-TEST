import type { Exam, ModuleId, QuizMode } from '../types/exam';
import { MODULE_LABELS } from '../types/exam';
import { Disclaimer } from './Disclaimer';
import { AppHeader } from './AppHeader';
import { useMemo, useState } from 'react';

const COMMUNITY_URL = 'https://www.facebook.com/groups/1450219003271674';

interface Props {
  exams: Exam[];
  selectedExamId: string;
  mode: QuizMode;
  timerEnabled: boolean;
  onExamChange: (id: string) => void;
  onModeChange: (mode: QuizMode) => void;
  onTimerChange: (enabled: boolean) => void;
  onStart: () => void;
}

export function ExamSelector({ exams, selectedExamId, mode, timerEnabled, onExamChange, onModeChange, onTimerChange, onStart }: Props) {
  const selected = exams.find((exam) => exam.id === selectedExamId) ?? exams[0];
  const [query, setQuery] = useState('');
  const filteredExams = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase('vi');
    return keyword ? exams.filter((exam) => `${exam.title} ${exam.description}`.toLocaleLowerCase('vi').includes(keyword)) : exams;
  }, [exams, query]);

  const handleSearch = (value: string) => {
    setQuery(value);
    const keyword = value.trim().toLocaleLowerCase('vi');
    const firstMatch = keyword ? exams.find((exam) => `${exam.title} ${exam.description}`.toLocaleLowerCase('vi').includes(keyword)) : exams[0];
    if (firstMatch) onExamChange(firstMatch.id);
  };
  const moduleRows = (Object.keys(MODULE_LABELS) as ModuleId[])
    .map((module) => ({ module, label: MODULE_LABELS[module], count: selected.questions.filter((question) => question.module === module).length }))
    .filter((item) => item.count > 0);

  return (
    <div className="app-frame">
      <AppHeader title="Luyện thi AI" />
      <main className="home page-shell">
        <section className="welcome-heading">
          <span className="eyebrow">AI TEST · OPEN SOURCE</span>
          <h1>Sẵn sàng cho buổi luyện tập?</h1>
          <p>Chọn một đề phù hợp và bắt đầu củng cố kiến thức AI thực chiến của bạn.</p>
        </section>

        <section className="exam-library card">
          <div className="section-heading">
            <div><span className="eyebrow">THƯ VIỆN ĐỀ THI</span><h2>Chọn bài kiểm tra</h2></div>
            <span className="count-badge">{exams.length} đề</span>
          </div>
          <label className="search-field">
            <span>Tìm kiếm đề thi</span>
            <input value={query} onChange={(event) => handleSearch(event.target.value)} placeholder="Nhập tên hoặc nội dung đề..." />
          </label>
          <label>
            <span>Danh sách đề</span>
            <select value={selectedExamId} onChange={(event) => onExamChange(event.target.value)}>
              {filteredExams.map((exam) => <option key={exam.id} value={exam.id}>{exam.title}</option>)}
            </select>
          </label>
          {filteredExams.length === 0 ? <div className="empty-state"><strong>Không tìm thấy đề phù hợp</strong><span>Thử tìm bằng từ khóa khác.</span></div> : (
            <div className="exam-overview">
              <div className="exam-overview__header">
                <div><strong>{selected.title}</strong><span>{selected.description}</span></div>
                <div className="meta-chips"><span>{selected.questions.length} câu hỏi</span><span>{selected.durationMinutes} phút</span></div>
              </div>
              <div className="module-list">
                {moduleRows.map((item) => <div key={item.module}><b>{item.module}</b><span><strong>{item.label}</strong><small>{item.count} câu hỏi</small></span></div>)}
              </div>
            </div>
          )}
        </section>

        <section className="setup card">
          <div className="section-heading"><div><span className="eyebrow">CẤU HÌNH</span><h2>Thiết lập bài làm</h2></div></div>

        <div className="mode-grid">
          <button className={mode === 'practice' ? 'active mode-card' : 'mode-card'} onClick={() => onModeChange('practice')}>
            <strong>Luyện tập</strong>
            <span>Xem đáp án và giải thích ngay sau khi chọn.</span>
          </button>
          <button className={mode === 'exam' ? 'active mode-card' : 'mode-card'} onClick={() => onModeChange('exam')}>
            <strong>Thi thử</strong>
            <span>Chỉ xem đáp án sau khi hoàn tất bài thi.</span>
          </button>
        </div>

        <label className="toggle-row">
          <span><strong>Bật đồng hồ đếm ngược</strong><small>Thời gian làm bài: {selected.durationMinutes} phút</small></span>
          <input type="checkbox" checked={timerEnabled} onChange={(event) => onTimerChange(event.target.checked)} />
        </label>
        <button className="primary start-button" disabled={filteredExams.length === 0} onClick={onStart}>Bắt đầu làm bài <span aria-hidden="true">→</span></button>
        <p className="setup-note">Tiến độ được lưu tự động trên thiết bị này.</p>
        </section>

        <footer className="home-footer">
          <a className="community-cta" href={COMMUNITY_URL} target="_blank" rel="noreferrer">Cộng đồng AI Thực Chiến <span aria-hidden="true">↗</span></a>
          <Disclaimer />
        </footer>
      </main>
    </div>
  );
}
