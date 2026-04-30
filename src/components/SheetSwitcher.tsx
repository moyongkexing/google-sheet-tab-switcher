import { useEffect, useMemo, useRef, useState } from 'react';
import type { Sheet } from '../types';

type SheetSwitcherProps = {
  getSheets: () => Sheet[];
  onSheetSelect: (sheet: Sheet) => void;
};

export const SheetSwitcher = ({ getSheets, onSheetSelect }: SheetSwitcherProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        event.shiftKey && event.key.toLowerCase() === 'f' && (event.metaKey || event.ctrlKey);

      if (!isShortcut) {
        return;
      }

      event.preventDefault();
      setIsVisible((previous) => !previous);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    setSheets(getSheets());
    setQuery('');
    setActiveIndex(0);
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }, [getSheets, isVisible]);

  const filteredSheets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return sheets;
    }

    return sheets.filter((sheet) => sheet.name.toLowerCase().includes(normalizedQuery));
  }, [query, sheets]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const close = () => {
    setIsVisible(false);
  };

  const handleSelect = (sheet: Sheet) => {
    onSheetSelect(sheet);
    close();
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, Math.max(filteredSheets.length - 1, 0)));
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selectedSheet = filteredSheets[activeIndex];

      if (selectedSheet) {
        handleSelect(selectedSheet);
      }
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="gst-root" role="presentation">
      <button
        className="gst-overlay"
        type="button"
        aria-label="Close sheet switcher"
        onClick={close}
      />
      <section className="gst-dialog" role="dialog" aria-modal="true" aria-label="Sheet switcher">
        <div className="gst-input-wrapper">
          <span className="gst-search-icon" aria-hidden="true">
            ⌕
          </span>
          <input
            ref={inputRef}
            className="gst-input"
            placeholder="Search sheets..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div className="gst-list" role="listbox" aria-label="Sheets">
          {filteredSheets.length === 0 ? (
            <p className="gst-empty">No sheet found.</p>
          ) : (
            filteredSheets.map((sheet, index) => (
              <button
                key={`${sheet.name}-${index}`}
                className={index === activeIndex ? 'gst-item gst-item-active' : 'gst-item'}
                type="button"
                role="option"
                aria-selected={index === activeIndex}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => handleSelect(sheet)}
              >
                {sheet.name}
              </button>
            ))
          )}
        </div>
      </section>
    </div>
  );
};
