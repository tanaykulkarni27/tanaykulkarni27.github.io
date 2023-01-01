var ids = ['popnxt', 'popprev'];
var images = ['/images/node.png', '/images/wall.png'];
var content = [
    'Click on node and hover over board to move node, Click again to stop',
    'Click on blank cell and hover over board to add walls, Click again to stop.'
];
var def = 1;
function change() {
    document.getElementById(ids[def ^ 1]).style.display = "none";
    document.getElementById(ids[def]).style.display = "";

    document.getElementById('popcontent').innerHTML = content[def];
    document.getElementById('popimg').src = images[def];
    def ^= 1;
}
