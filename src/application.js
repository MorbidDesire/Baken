const app = () => {
  const element1 = document.querySelector('.conveer1');
  const element2 = document.querySelector('.conveer2');
  element1.animate(
    [
      { transform: 'translate(0)' },
      { transform: 'translate(33%)' },
      { transform: 'translate(33.1%)' },
      { transform: 'translate(66%)' },
      { transform: 'translate(66.1%)' },
      { transform: 'translate(99.9%)' },
      { transform: 'translate(100%)' },
    ],
    {
      duration: 3000,
      iterations: Infinity,
    },
  );
  element2.animate(
    [
      { transform: 'translate(0)' },
      { transform: 'translate(33%)' },
      { transform: 'translate(33.1%)' },
      { transform: 'translate(66%)' },
      { transform: 'translate(66.1%)' },
      { transform: 'translate(99.9%)' },
      { transform: 'translate(100%)' },
    ],
    {
      duration: 3000,
      iterations: Infinity,
    },
  );
};

export default app;
