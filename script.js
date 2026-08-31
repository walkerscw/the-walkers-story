const buttons = document.querySelectorAll('[data-set-theme]');
const themeNames = { noir: 'Traditional black and white', emerald: 'Gold and green', sage: 'Sage, champagne and white' };

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.setTheme;
    document.body.dataset.theme = theme;
    buttons.forEach((item) => item.classList.toggle('active', item === button));
    document.title = `${themeNames[theme]} — Wilda & Sean Walker`;
  });
});
