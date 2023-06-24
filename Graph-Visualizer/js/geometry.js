export function get_distance(cord1,cord2){
    return Math.abs(cord1[0] - cord2[0]) + Math.abs(cord1[1] - cord2[1]);
}

export function find_to_nearest_points(cords1,cords2){
    var min_distance = 1000000000;
    var cords = [];
    for(var i in cords1){
        for(var j in cords2){
            var cur_distance = get_distance(cords1[i],cords2[j]);
            if(cur_distance < min_distance){
                min_distance = cur_distance;
                cords = [cords1[i],cords2[j]];
            }
        }
    }
    return cords;
}

export async function get_goood_cords(e1,e2){
    var x1 = e1.offsetLeft;
    var x2 = e2.offsetLeft;
    var y1 = e1.offsetTop;
    var y2 = e2.offsetTop;
    var c1 = [[x1,y1],[x1 + e1.offsetWidth,y1],[x1,y1 + 25],[x1 + e1.offsetWidth,y1 + 25]]; // cordinates of point_1 
    var c2 = [[x2,y2],[x2 + e2.offsetWidth,y2],[x2,y2 + 25],[x2 + e2.offsetWidth,y2 + 25]]; // cordinates of point_1    
    return await find_to_nearest_points(c1,c2);
}