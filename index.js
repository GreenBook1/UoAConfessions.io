const welcomeModal = document.getElementById('welcome-modal');
const licenseAccepted = localStorage.getItem('licenseAccepted');
const lusr = localStorage.getItem('usrn');
console.log(licenseAccepted);

if (licenseAccepted == 'true' && lusr !==null) { // Check if it’s not equal to the string 'true'
    welcomeModal.style.display = 'none';
}else{
    document.getElementById('accept-license').addEventListener('click', function () {
        if(document.getElementById("userna").value == "UserName"){
        alert("Enter a Valid User Name");

        }else{
            let yy = document.getElementById("userna").value.toString();
            localStorage.setItem('licenseAccepted', 'true'); // Store as string
            localStorage.setItem('usrn', yy ); // Store as string
        welcomeModal.style.display = 'none';
        }
        
    });
}



document.addEventListener('DOMContentLoaded', (e)=>{
    console.log("ready to .");
    // select a catogory by default
    defselect = 0;
    

    myselect(defselect);

});

CONVEX_URL="https://impressive-salmon-421.convex.cloud";
const client = new convex.ConvexClient(CONVEX_URL);

async function myselect(id){
    document.getElementById(`m${defselect}`).style.backgroundColor='';
    document.getElementById(`m${id}`).style.backgroundColor='#3498db';
    defselect = id;
    // now code here for action to show data accordingly
    tad = await client.query("tasks:getpostsbycatogry", {postcat:`m${id}`});
    let partid = document.getElementById("posts-list");
    let tempdata= "";
    console.log(tad);
    if(tad.length==0){
        tempdata = "No posts Yet | Be the first to add"
    }
    for( let a=0;a<tad.length;a++){
        tempdata += `
        <div>
                    <p>${tad[a].createdby}</p>
                    <p>${tad[a].postcontent}</p>
                    </p>
                </div>
        `;
    }
    document.getElementById("posts-list").innerHTML = tempdata;
}

async function newpostadd(){
    let text1 = document.getElementById("ptext").value;
    let catg = document.getElementById("category").value;
    if(catg=="" || text1.length<50){
        confirm("Category not Selected or Post is too short");
    }
    else{
        try{

            enrolledtad = await client.mutation("tasks:createpost", {
                cat: catg,
        byid: lusr.toString(),
        content: text1,
              }).then(  ()=>{

                location.reload();

              });


        }catch(e){
            alert("Some Error Occured !")
        }
    }
}