const IMAGES = [
  '/img/img1.jpg',
  '/img/img2.jpg',
  '/img/img3.jpg',
  '/img/img4.jpg',
  '/img/img7.jpg',
  '/img/img8.jpg',
  '/img/img9.jpg',
  '/img/img10.jpg',
  '/img/img11.jpg',
]

let currentIndex = 0

/**
 * 返回下一张图片路径，按 IMAGES 顺序循环使用
 */
export function randomImage(): string {
  const image = IMAGES[currentIndex]
  currentIndex = (currentIndex + 1) % IMAGES.length
  return image
}


