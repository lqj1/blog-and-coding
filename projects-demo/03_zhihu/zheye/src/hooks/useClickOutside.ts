import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  // 定义属性
  const isClickOutside = ref(false)
  // 定义方法
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  return isClickOutside
}
export default useClickOutside
