
const cardsData = () => {
  fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then((res) => res.json())
    .then((data) => {
        displayCard(data.data.tools.slice(0,6));
    });
};
// cardsData(); 

const displayCard = (card) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";
    card.forEach(card =>{
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("col");
        cardDiv.innerHTML = `
        <div class="card p-4  shadow " style="width:100%; height: 100%;">
              <!-- Image here -->
              <img src="${card.image}" class="card-img-top" />
              <div class="card-body">
                <h5 id="feature-title" class="card-title fw-semibold fs-2 mt-">
                  Features
                </h5>
              </div>
              <!-- Feature here -->
              <ol class="opacity-75 fw-semibold">
                <li class="">${
                  card.features[0] ? card.features[0] : "No Data Found"
                }</li>
                <li class="">${
                  card.features[1] ? card.features[1] : "No Data Found"
                }</li>
                <li class="">${
                  card.features[2] ? card.features[2] : "No Data Found"
                }</li>
              </ol>
              <hr />
              <div class="card-body d-flex">
                <div>
                  <!-- Card Title here -->
                  <h5 class="card-title fw-bold py-2 fs-4">${card.name}</h5>
                  <p class="fst-normal fs-6 opacity-75 fw-semibold ">
                    <i class="fa-regular fa-calendar-days"></i>  ${
                      card.published_in
                    }
                  </p>
                </div>

                <p onclick = "loadModal('${card.id}')" class="card-link  ms-auto align-items-center mt-4 pt-2 "  >
                  <i  class="fa-regular fa-circle-question fa-2xl text-danger" data-bs-target="#exampleModal" data-bs-toggle="modal" ></i>
                </p>
       

              </div>
            </div>
        `;
        
        cardsContainer.appendChild(cardDiv);
    });
      

};

/* Show all cards button */
const showAllCard = () =>  {  
  fetch("https://openapi.programming-hero.com/api/ai/tools")
  .then((res) => res.json())
  .then((data) => {
      displayCard(data.data.tools);
    });  
};

/* Card details function */

const loadModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
//   console.log(id)
  // console.log(url)
  fetch(url)
    .then((res) => res.json())
    .then((card) => showModal(card.data));
};
const showModal =(data)=>{
  console.log(data);
  const description = document.getElementById("description");
  description.innerHTML = `${data.description}`;
  const monthBasic = document.getElementById("month-basic");
  monthBasic.innerHTML = `${data.pricing[0].price} <br> ${data.pricing[0].plan}`
  const monthPro = document.getElementById("month-pro");
  monthPro.innerHTML = `${data.pricing[1].price} <br> ${data.pricing[1].plan}`
  const monthEnterprice = document.getElementById("month-enterprice");
  monthEnterprice.innerHTML = `${data.pricing[2].price} <br> ${data.pricing[2].plan}`
   /* -------------fratures-----------------  */

  const featureI = document.getElementById("li-I");
  featureI.innerHTML = `${data.features["1"].feature_name}`;

  const featureII = document.getElementById("li-II");
  featureII.innerHTML = `${data.features["2"].feature_name}`;

  const featureIII = document.getElementById("li-III");
  featureIII.innerHTML = `${data.features["3"].feature_name}`;

  // intrgraions --------------

  const intergrations = document.getElementById("integrations");
  console.log(data.integrations);
  data.integrations.forEach(inte => {
    const ul = document.createElement ("ul");
    ul.innerHTML = `
    <li>${inte}</li>    
    `;
    
    intergrations.appendChild(ul);
  })

const image = document.getElementById("image");
image.innerHTML = `
  <img  src="${data.image_link[0]}" class="card-img-top position-relative">
  <button class = "btn btn-danger px-4 py-2 fw-bold position-absolute top-0 end-0">${
    data.accuracy.score * 100
  } %Accuracy</button>
  <h5 class = "text-center fw-bold">${data.input_output_examples[0].input ? data.input_output_examples[0].input : "Can you give example? "  }</h5>
  <p class = "text-center" >${data.input_output_examples[1].output ? data.input_output_examples[1].output : "No! Not yet! Take a break!!!"}</p>
`;

}
