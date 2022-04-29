class TreadmillHandler {
  constructor() {
    this.inclineUpBtn = document.getElementById('incline-up');
    this.inclineDownBtn = document.getElementById('incline-down');
    this.speedUpBtn = document.getElementById('speed-up');
    this.speedDownBtn = document.getElementById('speed-down');
    this.resetButton = document.getElementById('reset');
    this.startStopButton = document.getElementById('start-stop');
    this.inclineValue = document.getElementById('treadmill-incline-value');
    this.distanceValue = document.getElementById('treadmill-distance-value');
    this.caloriesValue = document.getElementById('treadmill-calories-value');
    this.speedValue = document.getElementById('treadmill-speed-value');
    this.timeValue = document.getElementById('treadmill-time-value');
    this.isWorking = false;
    this.isFirst = true;
    this.totalSeconds = 0;
    this.timerInterval = null;
    this.minimumSpeed = 0.2;
    this.currentSpeed = 0.2;
    this.maximumSpeed = 30;
    this.minimumIncline = 0;
    this.currentIncline = 0;
    this.maximumIncline = 15;
    this.distanceInterval = null;
    this.caloriesInterval = null;
  }
  run() {
    this.startStopButton.addEventListener(
      'click',
      this.startHandler.bind(this)
    );
    this.speedUpBtn.addEventListener(
      'click',
      this.speedHandler.bind(this, 'up')
    );
    this.speedDownBtn.addEventListener(
      'click',
      this.speedHandler.bind(this, 'down')
    );
    this.inclineUpBtn.addEventListener(
      'click',
      this.inclineHandler.bind(this, 'up')
    );
    this.inclineDownBtn.addEventListener(
      'click',
      this.inclineHandler.bind(this, 'down')
    );
    this.resetButton.addEventListener('click', this.resetHandler.bind(this));
  }
  countUpTimer() {
    // https://www.delftstack.com/howto/javascript/javascript-count-up-timer/
    this.totalSeconds = this.totalSeconds + 1;
    let hour = Math.floor(this.totalSeconds / 3600);
    hour = hour < 10 ? '0' + hour : hour;
    let minute = Math.floor((this.totalSeconds - hour * 3600) / 60);
    minute = minute < 10 ? '0' + minute : minute;
    let seconds = this.totalSeconds - (hour * 3600 + minute * 60);
    seconds = seconds < 10 ? '0' + seconds : seconds;
    this.timeValue.textContent = hour + ':' + minute + ':' + seconds;
  }
  startHandler() {
    if (this.isFirst) {
      this.speedValue.textContent = 0.2;
      this.isFirst = false;
    }
    if (this.isWorking) {
      clearInterval(this.timerInterval);
      clearInterval(this.distanceInterval);
      clearInterval(this.caloriesInterval);
      this.isWorking = false;
    } else {
      this.timerInterval = setInterval(this.countUpTimer.bind(this), 1000);
      this.distanceInterval = setInterval(
        this.distanceCalculator.bind(this),
        1000
      );
      this.caloriesInterval = setInterval(
        this.caloriesCalculator.bind(this),
        1000
      );
      this.isWorking = true;
    }
  }
  speedHandler(status) {
    if (
      (this.currentSpeed > this.maximumSpeed &&
        this.currentSpeed < this.minimumSpeed) ||
      !this.isWorking
    ) {
      return;
    }
    if (this.isWorking && status === 'up') {
      this.currentSpeed =
        this.currentSpeed >= this.maximumSpeed
          ? this.maximumSpeed
          : this.currentSpeed + 0.2;
    } else if (this.isWorking && status === 'down') {
      this.currentSpeed =
        this.currentSpeed <= this.minimumSpeed
          ? this.minimumSpeed
          : this.currentSpeed - 0.2;
    }
    this.currentSpeed = Math.round(this.currentSpeed * 10) / 10;
    this.speedValue.textContent = this.currentSpeed;
  }
  inclineHandler(status) {
    if (
      (this.currentIncline > this.maximumIncline &&
        this.currentIncline < this.minimumIncline) ||
      !this.isWorking
    ) {
      return;
    }
    if (this.isWorking && status === 'up') {
      this.currentIncline =
        this.currentIncline >= this.maximumIncline
          ? this.maximumIncline
          : this.currentIncline + 1;
    } else if (this.isWorking && status === 'down') {
      this.currentIncline =
        this.currentIncline <= this.minimumIncline
          ? this.minimumIncline
          : this.currentIncline - 1;
    }
    this.inclineValue.textContent = this.currentIncline;
  }
  distanceCalculator() {
    let hour = this.totalSeconds / 3600;
    let distance = this.currentSpeed * hour;
    distance = distance * 1000;
    this.distanceValue.textContent = distance.toFixed(2);
  }
  caloriesCalculator() {
    this.caloriesValue.textContent = 1347;
  }
  resetHandler() {
    this.isWorking = false;
    this.isFirst = true;
    this.totalSeconds = 0;
    this.currentSpeed = 0.2;
    this.currentIncline = 0;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    clearInterval(this.distanceInterval);
    this.distanceInterval = null;
    clearInterval(this.caloriesInterval);
    this.caloriesInterval = null;
    this.inclineValue.textContent = '0';
    this.distanceValue.textContent = '0';
    this.caloriesValue.textContent = '0';
    this.speedValue.textContent = '0';
    this.timeValue.textContent = '00:00:00';
  }
}
