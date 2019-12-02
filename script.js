chrome.tabs.query({active: true, url:["http://*/notebooks/*", "https://hub.gke.mybinder.org/*"]}, tab => {
    if(tab[0] !== undefined){
        let id = tab[0].id

        let btn = document.getElementById('toggle')
        let txt = document.getElementById('detect')
        let box = document.getElementById('box')

        box.style.display = 'inline-block'
        txt.style.display = 'none'

        chrome.storage.sync.get("is", val => {
            btn.checked = val["is"] ? true : false
        })
        
        btn.addEventListener('click', changeColor)

        function changeColor(){
            if(btn.checked){
                browser.tabs.insertCSS({
                    file: './styles/dark.css'
                })
                chrome.storage.local.set({id: true})
            }else{
                // browser.tabs.removeCSS(
                //     id,
                //     {
                //         file: './layout/cells.less',
                //         file: './layout/codemirror.less',
                //         file: './layout/completer.less',
                //         file: './layout/extras.less',
                //         file: './layout/notebook.less',
                //         file: './layout/vim.less',
                //         file: './style/dark.css'
                //     }
                // )
                chrome.storage.local.set({id: false})
            }
        }
    }else{
        let txt = document.getElementById('detect')
        let box = document.getElementById('box')
        box.style.display = 'none'
        txt.style.display = 'block'
    }
})