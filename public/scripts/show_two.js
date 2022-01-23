

async function append_two(data,location){

    data.map((el,index)=>{
        let div = document.createElement("div");
        if(index%2==0){
            div.setAttribute("class"," knowcardeven");
        }else{
            div.setAttribute("class","knowcardodd");
        }
        div.setAttribute('data-aos','fade-up');

        let arr = ["Jan","Feb","March","April","May","June","July","August","Sept","Oct","Nov","Dec"]
        
        let img = document.createElement("img");
        img.src = el.url;
        let divtwo = document.createElement("div");
        let date = document.createElement("p");
        date.textContent =arr[Math.floor(Math.random()*12)]+" " + Math.floor(Math.random()*28)+" " + 2021 
        let h2 = document.createElement("h2");
        h2.textContent = el.title;
        let p = document.createElement("button");
        p.textContent = "Continue reading"
        p.addEventListener("click",()=>{
            window.location.href = `/viewmore/${el.id}`
        })
        divtwo.append(date,h2,p)
        div.append(img,divtwo);
        location.append(div);
    })


}

export default append_two