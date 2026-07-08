'use client';

import type { Entry } from '@prisma/client';
import { useState } from 'react';

export function EntryPage({ initialEntries }: { initialEntries: Entry[] }) {
  const [entries, setEntries] = useState(initialEntries);
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  async function refresh(q: string) {
    const response = await fetch(`/api/entries?q=${encodeURIComponent(q)}`, {
      cache: 'no-store',
    });
    setEntries(await response.json());
  }

  async function handleSubmit() {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editingId) {
      await fetch(`/api/entries/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });
    } else {
      await fetch('/api/entries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed }),
      });
    }

    setText('');
    setEditingId(null);
    await refresh(query);
  }

  async function handleDelete(id: number) {
    await fetch(`/api/entries/${id}`, { method: 'DELETE' });
    await refresh(query);
  }

  function handleEdit(entry: Entry) {
    setEditingId(entry.id);
    setText(entry.text);
  }

  return (
    <main className='mx-auto max-w-280 px-4 pt-10 pb-14'>
      <header
        className="grid min-h-75 items-end rounded-lg border p-8.5
          border-[color-mix(in_srgb,var(--color-primary)_22%,var(--color-border))]
          bg-surface bg-[url('/assets/icon.svg')] bg-no-repeat
          bg-position-[right_34px_top_34px] bg-size-[150px] shadow-card"
      >
        <div className='max-w-190'>
          <h1 className='mb-5.5 max-w-180 text-[clamp(2.1rem,5vw,4rem)] leading-[1.05]'>
            CRUD Launchpad
          </h1>
          <div
            className='inline-grid w-fit max-w-full rounded-lg border border-l-4
              border-[color-mix(in_srgb,var(--color-accent)_28%,var(--color-border))]
              border-l-accent bg-tip-bg p-4'
          >
            <p className='max-w-[62ch] text-[0.95rem] font-semibold text-text'>
              ここに登録した文章は、PostgreSQL（Prisma経由）に保存されます。
            </p>
          </div>
        </div>
      </header>

      <section className='mt-6 grid items-start gap-6 md:grid-cols-[minmax(280px,0.9fr)_minmax(360px,1.1fr)]'>
        <div className='grid gap-3.5 rounded-lg border border-border bg-surface p-6 shadow-card'>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='min-h-55 w-full resize-y rounded-lg border border-border
              bg-field-bg p-3.5 text-text outline-none
              focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-warning)_54%,transparent)]'
          />
          <button
            onClick={handleSubmit}
            className='min-h-10.5 rounded-lg border border-transparent bg-primary
              px-4 font-bold text-white hover:bg-primary-strong'
          >
            {editingId ? '更新' : '登録'}
          </button>
        </div>

        <div className='rounded-lg border border-border bg-surface p-6 shadow-card'>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              refresh(e.target.value);
            }}
            placeholder='検索'
            className='min-h-11 w-full rounded-lg border border-border bg-field-bg
              px-3 text-text outline-none
              focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-warning)_54%,transparent)]'
          />

          <ul className='mt-4 grid gap-3'>
            {entries.map((entry) => (
              <li
                key={entry.id}
                className='grid gap-3.5 rounded-lg border border-border bg-surface-muted p-4'
              >
                {entry.text}
                <div className='flex items-center justify-between gap-3'>
                  <button
                    onClick={() => handleEdit(entry)}
                    className='text-sm font-bold text-primary hover:underline'
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className='text-sm font-bold text-accent hover:underline'
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {entries.length === 0 && (
            <p className='mt-4 rounded-lg border border-dashed border-border bg-surface-muted p-4 text-center text-muted'>
              まだ文章が登録されていません。
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
