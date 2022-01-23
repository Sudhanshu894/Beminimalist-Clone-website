

async function append(data,location){

    data.forEach((el)=>{
        let div = document.createElement("div");
        div.setAttribute("class","knowcard");
        div.setAttribute('data-aos','zoom-in-up');
        let img = document.createElement("img");
        img.src = el.url;
        let h2 = document.createElement("h2");
        h2.textContent = el.title;
        let p = document.createElement("p");
        p.textContent = "Read more"
        p.addEventListener("click",()=>{
            console.log(el.id);
            window.location.href = `/knowledge/${el.id}`


        })
        div.append(img,h2,p);
        location.append(div);
    })

}

export default append