function snapToIdx(ref, idx, time, animation = true, callback = true) {
  if (typeof time != "number") time = 250;

  //weird bugs of library
  setTimeout(() => ref.snapToItem(idx, animation, callback), time);
}

export default {
  snapToIdx
};
