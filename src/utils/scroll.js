export default {
    scrollTo(endNode, callback, duration) {

        duration = duration || 500
        const el = document.querySelector('.el-main')
        const end = document.getElementById(endNode).offsetTop - 60

        let start = el.scrollTop
        let clock = Date.now()

        const requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame ||
            function (fn) { window.setTimeout(fn, 15) }

        const step = function () {
            let elapsed = Date.now() - clock
            el.scrollTop = position(start, end, elapsed, duration)
            
            if (elapsed > duration) {
                if (typeof callback === 'function') {
                    callback()
                }
            } else {
                requestAnimationFrame(step)
            }
        }
        step()
    }
}

const position = (start, end, elapsed, duration) => {
    if (elapsed > duration) return end
    return start + (end - start) * easeInOutCubic(elapsed / duration)
}

const easeInOutCubic = t => { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }