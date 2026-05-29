const cl = console.log;
const blogform =document.getElementById('blogform')
const blogcontrol =document.getElementById('blogcontrol')
const topicname =document.getElementById('topicname')
const blogcontainer =document.getElementById('blogcontainer')
const spinner =document.getElementById('spinner')



let blogarr=[
    {
        Name : 'JS',
        Description : `JavaScript is a high-level, interpreted, dynamically typed scripting language mainly used to create interactive and dynamic web applications.`
    },
    {
        Name : 'async',
        Description :`Async JavaScript (asynchronous JavaScript) is a way to run code without blocking the rest of your program. It lets your app keep working while waiting for things like data from a server, file loading, or timers.`
    }
]


function snackbar(msg){
    swal.fire({
        title : msg,
        icon : 'success',
        timer : 3000
    })
}

function onsubmit(ele){
    ele.preventDefault()
    spinner.classList.remove('d-none')
    let newblog ={
        Name : topicname.value,
        Description : blogcontrol.value
    }

    blogform.reset()
    addblog(newblog)
        .then((res)=>{
            snackbar(res)
            return fetchblog()
        })
        .then((res)=>{
            snackbar(res)
            templating(blogarr)
        })
        .catch((err) =>{
            swal.fire({
                title : err,
                icon :'error',
                timer : 3000
            })
        })
        .finally(()=>{
            spinner.classList.add('d-none')
        })

}

function addblog(newblog){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            let success = Math.random() > .5

            if(success){
                let res = 'Blog addedd successfully'
                resolve(res)
                blogarr.push(newblog)
                
            }else{
                let err = 'Server Down!'
                reject(err)

            }
        },700 );
    })
}

function fetchblog(){
    return new Promise((resolve,reject) =>{
        setTimeout(() => {
            let success = Math.random() >.5

            if(success){
                let res = 'Blog Fetch successfully'
                resolve(res)

            }else{
                let err ='Blog fetch Failed!!'
                reject(err)

            }


        }, 600);
    })
}


function templating(arr){
    let result =``

    arr.forEach(ele =>{
        result+=` <div class="col-md-3">
					<div class="card">
						<div class="card-header">
							<strong>${ele.Name}</strong>
						</div>
						<div class="card-body p-4">
							<p>${ele.Description}</p>
						</div>
						<div class="card-footer d-flex justify-content-between">
							<button class="btn btn-danger btn-sm ">Edit</button>
							<button class="btn btn-primary btn-sm ">remove</button>
						</div>
					</div>
				</div>`
    })

    blogcontainer.innerHTML = result
    
}

 







blogform.addEventListener('submit',onsubmit)