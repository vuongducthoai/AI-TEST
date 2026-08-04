interface Props {
  title: string;
  onMenu?: () => void;
}

export function AppHeader({ title, onMenu }: Props) {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="brand-group">
          {onMenu && <button className="icon-button mobile-menu" onClick={onMenu} aria-label="Mở điều hướng câu hỏi">☰</button>}
          <a className="brand" href="./" aria-label="AI TEST - Trang chủ">
            <span className="brand-mark" aria-hidden="true">AI</span>
            <span>AI TEST</span>
          </a>
          <span className="header-divider" aria-hidden="true" />
          <span className="page-title">{title}</span>
        </div>
        <div className="header-actions">
          <button className="icon-button" aria-label="Thông báo" title="Thông báo">●</button>
          <div className="avatar" aria-label="Tài khoản người học">AT</div>
        </div>
      </div>
    </header>
  );
}
