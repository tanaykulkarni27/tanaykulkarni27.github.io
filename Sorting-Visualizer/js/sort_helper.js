export let array = [];
export let speed  = [650, 640, 630, 620, 610, 600, 590, 580, 570, 560, 550, 540, 530, 520, 510, 500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 390, 380, 370, 360, 350, 340, 330, 320, 310, 300, 290, 280, 270, 260, 250, 240, 230, 220, 210, 200, 190, 180, 170, 160, 150, 140, 130, 120, 110, 100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
function getRandomNUM(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function delay(ms){
	return new Promise( resolve => {
	    setTimeout(()=> {resolve('')} ,ms );
	});
}

export async function generateArray(size,bar_width){
    array = [];
    document.getElementById('bar-container').innerHTML = '';
    for(var i = 0;i < size;i++){
        let val = getRandomNUM(50,500);
        array.push(val);
        document.getElementById('bar-container').innerHTML += '<div id="'+i+'" class="bar" style="width:'+bar_width+'px;height:'+array[array.length - 1]+'px;"></div>';
    }
    return array;
}

export async function highlight(i,color,delay_time){
    
    var x = ()=>{document.getElementById(i).style.backgroundColor = color};
    await x();
    if(delay_time != null)
        await delay(delay_time);
    if(delay_time != null){
        x = ()=>{document.getElementById(i).style.backgroundColor = 'cyan'};
        await x();
    }
}

export async function swap(aval,bval,aid,bid,delay_time,chg_color = 0){
    
    let a = document.getElementById(aid);
    let b = document.getElementById(bid);
    
    let acolor = a.style.backgroundColor;
    let bcolor = b.style.backgroundColor;

    let ia = a.innerHTML;
    let ib = b.innerHTML;

    // Highlight red
    if(chg_color == 0){
        a.style.backgroundColor = 'red';
        b.style.backgroundColor = 'red';
        
        await delay(delay_time);
    }

    a.style.height = bval + "px";
    b.style.height = aval + "px";
    a.innerHTML = ib;
    b.innerHTML = ia;

    if(chg_color == 0){
        // Highlight green
        a.style.color = 'black';
        b.style.color = 'black';

        a.style.backgroundColor = 'lightgreen';
        b.style.backgroundColor = 'lightgreen';
        await delay(delay_time);
        a.style.backgroundColor = acolor;
        b.style.backgroundColor = bcolor;
        a.style.color = 'black';
        b.style.color = 'black';        
    }
}

export async function highlight_multi(bars,color,delay_time){
    for(var i of bars){
        document.getElementById(i).style.backgroundColor = color;
    }
    await delay(delay_time);
    for(var i of bars){
        document.getElementById(i).style.backgroundColor = 'cyan';
    }
}

export function mark(a,innerHTML,colors = null){
    for(var i in a){
        document.getElementById(a[i]).innerHTML = innerHTML[i];
        if(colors != null)
            document.getElementById(i).style.color = colors[i];

    }
}