export function filterNotes() {
  function alphabetic(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  function timer(a, b) {
    if (a.timestamp.seconds > b.timestamp.seconds) {
      return 1;
    }
    if (a.timestamp.seconds < b.timestamp.seconds) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  function timerMayor(a, b) {
    if (b.timestamp > a.timestamp) {
      return 1;
    }
    if (b.timestamp < a.timestamp) {
      return -1;
    }
    // a must be equal to b
    return 0;
  }
  return {
    alphabetic,
    timer,
    timerMayor,
  };
}
