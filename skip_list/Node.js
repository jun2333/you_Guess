class Node {
  constructor(data, maxlevel) {
    this.data = data;
    this.maxlevel = maxlevel;
    this.forwards = []
  }
}

export default Node;
