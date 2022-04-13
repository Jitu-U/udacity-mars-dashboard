let store = {
    currentTab: 'curiosity',
    roverInfo: {},
    roverImages: [],
}

// add our markup to the page
const root = document.getElementById('root');
const tabs= document.querySelectorAll('.tab');

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state, renderInfo, renderImages)
}



const App = (state, renderInfo, renderImages) => {
    const { roverInfo, roverImages, currentTab } = state

    return renderPage(roverInfo, roverImages,currentTab, renderInfo, renderImages);
}


//To render the content on page
const renderPage = (roverInfo, roverImages,currentTab,renderInfo,renderImage) => {
    const infoHTML= renderInfo(roverInfo,currentTab);
    const imageHTML= renderImage(roverImages,roverInfo,currentTab);
    return `
        <div>
            <div class="info-container">
                ${infoHTML}
            </div>
            <section class="image-container">
                ${imageHTML}
            </section>
        </div>
    `
}


//Fetch All data including rover info and photos
const fetchData= async (store,currentTab)=>{
    await getRoverData(store,currentTab);
    await getRoverImages(store,currentTab);
}


//Onload Event
window.addEventListener('load', async () => {
    init(tabs,store);
    await fetchData(store,"curiosity");
    render(root, store);
})

const init = async (tabs,store)=>{
    tabs.forEach(tab => {
        tab.addEventListener('click',async e => {
            const currentTab=e.target.id;
            await updateStore(store,{currentTab: currentTab});
            activeTab(tabs,currentTab);
            fetchData(store,currentTab);
        })
    });
}


//Make active tab CSS class Active
const activeTab = (tabs,currentTab)=>{
    tabs.forEach(tab=>{
        if(tab.id ===currentTab){
            tab.classList.add('active')
        }else{
            tab.classList.remove('active')
        }
    })
}

// ------------------------------------------------------  COMPONENTS

//Function rendering information
const renderInfo = (info,currentTab) => {
    console.log(info.name);
    console.log(currentTab)

    if(currentTab === info.name){
        return `
        <figure>
            <img src="${info.image}" alt="${info.name}" class="main-rover-img"/>
            <figcaption>${info.name} Rover, source: <a href='${info.image}'>NASA</a> </figcaption>
        </figure>

        <div class="info">
            <strong>About</strong>
            <p>${info.about}</p>
            <br/>
            <strong>Launch Date</strong>
            <p>${info.launch_date}</p>
            <br/>
            <strong>Landing Date</strong>
            <p>${info.landing_date}</p>
            <br/>
            <strong>Status</strong>
            <p>${info.status}</p>
            <br/>
            <strong>Photos Captured</strong>
            <p>${info.total_photos}</p>
            <br/>
        </div>
    `
    } else {
        return `<div>
                    Loading...
                </div>`
    }
   
}

// function renders images requested from the backend
const renderImages = (images,info,currentTab) => {
    let imageHTML=``;

    if(currentTab === info.name){
        images.map(image => {
            imageHTML+=`
                        <figure class="image-card">
                            <img src="${image.img_src}" alt="Image by ${image.rover.name} Rover" class="rover-image"/>
                            <figcaption>
                                <span><b>Sol:</b> ${image.sol}</span><br/>
                                <span><b>Earth date:</b> ${image.earth_date}</span>
                            </figcaption>
                        </figure>`
        })
    } else{
        imageHTML=`<div>Searching in the Gallery...</div>`
    }
    
    return imageHTML;
}

// ------------------------------------------------------  API CALLS

const getRoverData = (store,name) => {
    fetch(`http://localhost:3000/rovers/info/${name}`,)
        .then(res => res.json())
        .then(roverInfo => {
            updateStore(store, { roverInfo: roverInfo })
            console.log(store);
        })
}

const getRoverImages = (store,name) => {
    fetch(`http://localhost:3000/rovers/images/${name}`)
        .then(res => res.json())
        .then(roverImages =>{
            updateStore(store, { roverImages: roverImages })
            console.log(store);
        } )
}