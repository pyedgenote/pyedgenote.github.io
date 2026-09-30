/**
 * edgenote — Developer Tool Static Website Logic
 * Target: https://edgenote.github.io
 */

document.addEventListener('DOMContentLoaded', () => {
  initCopyButton();
  initSimulator();
  initScrollReveal();
});

/**
 * Copy-to-clipboard functionality
 */
function initCopyButton() {
  const copyBtn = document.getElementById('copyInstallBtn');
  const installText = document.getElementById('installCommandText');

  if (!copyBtn || !installText) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = installText.innerText.trim();

    try {
      await navigator.clipboard.writeText(textToCopy);
      
      const originalHTML = copyBtn.innerHTML;
      copyBtn.classList.add('copied');
      copyBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Copied!</span>
      `;

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        copyBtn.innerHTML = originalHTML;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  });
}

/**
 * Interactive Attention Simulator
 * Demonstrates the mystery of Lost in the Middle and how edgenote resolves it
 */
function initSimulator() {
  const modeLinear = document.getElementById('modeLinear');
  const modeEdgenote = document.getElementById('modeEdgenote');
  const slotsContainer = document.getElementById('promptSlots');
  const deadZoneBadge = document.getElementById('deadZoneBadge');
  const diagnosticResult = document.getElementById('diagnosticResult');
  const curvePath = document.getElementById('attentionCurvePath');

  if (!modeLinear || !modeEdgenote || !slotsContainer) return;

  // State configurations
  const states = {
    linear: {
      curveStroke: 'url(#gradientLinear)',
      deadZoneText: 'ATTENTION SINKHOLE: 12% RECALL',
      deadZoneClass: 'badge-danger',
      diagnosticHTML: `
        <div class="diagnostic-text">
          <span class="diagnostic-badge badge-danger">Vulnerable Layout</span>
          <span>Critical financial constraint landed at 50% depth. Model completely hallucinates over budget cap.</span>
        </div>
        <span style="font-family: var(--font-mono); color: var(--accent-red); font-size: 0.8rem;">Failure Rate: 100%</span>
      `,
      slots: [
        {
          zone: '0.0 (Primacy)',
          payload: 'Doc 1: General company overview',
          state: 'state-pinned',
          recall: '✓ 98% Attention'
        },
        {
          zone: '0.25 (Quarter)',
          payload: 'Doc 2: Server room temperature limits',
          state: 'state-vulnerable',
          recall: '✗ 34% Attention'
        },
        {
          zone: '0.50 (Dead Center)',
          payload: '<strong>Constraint: Strict $185k Cap</strong>',
          state: 'state-vulnerable',
          recall: '✗ 0% Recall (LOST)'
        },
        {
          zone: '0.75 (Three-Quarter)',
          payload: 'Doc 3: Vendor quotation $240,000',
          state: 'state-vulnerable',
          recall: '✗ 28% Attention'
        },
        {
          zone: '1.0 (Recency)',
          payload: 'Final User Query: Which vendor to buy?',
          state: 'state-pinned',
          recall: '✓ 99% Attention'
        }
      ]
    },
    edgenote: {
      curveStroke: 'url(#gradientEdgenote)',
      deadZoneText: 'DEFENSIVE CENTER: LOW-RISK EVIDENCE ONLY',
      deadZoneClass: 'badge-success',
      diagnosticHTML: `
        <div class="diagnostic-text">
          <span class="diagnostic-badge badge-success">Fortified Geometry</span>
          <span>Constraints pinned at head + echoed at tail. Low-priority documents safely occupy center.</span>
        </div>
        <span style="font-family: var(--font-mono); color: var(--accent-emerald); font-size: 0.8rem;">Recall: 100% (+44 tok)</span>
      `,
      slots: [
        {
          zone: '0.0 (Head Pin)',
          payload: '<strong>Constraint: Strict $185k Cap</strong>',
          state: 'state-pinned',
          recall: '✓ 100% Fortified'
        },
        {
          zone: '0.25 (Near-Head)',
          payload: 'Rank 1: Top Relevant Quotation',
          state: 'state-pinned',
          recall: '✓ 95% Attention'
        },
        {
          zone: '0.50 (Center Valley)',
          payload: 'Low-priority context / evicted fillers',
          state: 'state-middle-safe',
          recall: '○ Sacrificial Valley'
        },
        {
          zone: '0.75 (Near-Tail)',
          payload: 'Rank 2: Alternate Vendor Evidence',
          state: 'state-pinned',
          recall: '✓ 96% Attention'
        },
        {
          zone: '1.0 (Tail Echo)',
          payload: '<strong>Constraint Reminder + Query</strong>',
          state: 'state-pinned',
          recall: '✓ 100% Fortified'
        }
      ]
    }
  };

  function renderSlots(mode) {
    const config = states[mode];
    slotsContainer.innerHTML = '';

    config.slots.forEach(s => {
      const slotDiv = document.createElement('div');
      slotDiv.className = `slot ${s.state}`;
      slotDiv.innerHTML = `
        <div class="slot-zone">
          <span>${s.zone}</span>
        </div>
        <div class="slot-payload">${s.payload}</div>
        <div class="slot-recall">${s.recall}</div>
      `;
      slotsContainer.appendChild(slotDiv);
    });

    if (deadZoneBadge) {
      deadZoneBadge.textContent = config.deadZoneText;
      deadZoneBadge.className = `dead-zone-indicator ${config.deadZoneClass}`;
    }

    if (diagnosticResult) {
      diagnosticResult.innerHTML = config.diagnosticHTML;
    }

    if (curvePath) {
      curvePath.setAttribute('stroke', config.curveStroke);
    }
  }

  modeLinear.addEventListener('click', () => {
    modeLinear.classList.add('active');
    modeEdgenote.classList.remove('active');
    renderSlots('linear');
  });

  modeEdgenote.addEventListener('click', () => {
    modeEdgenote.classList.add('active');
    modeLinear.classList.remove('active');
    renderSlots('edgenote');
  });

  // Default initial render
  renderSlots('edgenote');
}

/**
 * Scroll reveal observer for subtle, elegant motion
 */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}
