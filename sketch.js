

const tiles = [];
const dim = 20;
let grid = [];
const [b,d,l,r,u] = [0,1,2,3,4];
const dir = "bdlru";
const keys = {
        "b":0,
        "d":1,
        "l":2,
        "r":3,
        "u":4
};
function preload()
{
   img = ["blank","down","left","right","up"];
   for(let i=0;i<img.length;i++)
   {
     tiles[i] = loadImage(`${img[i]}.png`);
   }
   //declaring nxn matrix for grid initialisation
   for(let i=0;i<dim;i++)
   {
    for(let j=0;j<dim;j++)
        grid[i+j*dim] = {
            collapsed: false,
            options: [b,d,l,r,u],
            img:0,
            index:[i,j]
        };
   }
}
//rules are strict, I know!!
const rules = { 
        "bu":"bu",
        "bd":"bd",
        "bl":"bl",
        "br":"br",
        "uu":"drl",
        "ud":"db",
        "ul":"udr",
        "ur":"udl",
        "du":"ub",
        "dd":"ulr",
        "dl":"udr",
        "dr":"udl",
        "lu":"lrd",
        "ld":"lru",
        "ll":"lud",
        "lr":"br",
        "ru":"lrd",
        "rd":"lru",
        "rl":"bl",
        "rr":"rud"
};
function setup()
{
    createCanvas(800,800);
}
function minentropy(grid)
{
  let gridcopy = grid.slice().filter((a)=>!a.collapsed);
//   console.table(gridcopy);
  gridcopy.sort((a,b)=>a.options.length-b.options.length);
  let minol = gridcopy[0].options.length;
  gridcopy = gridcopy.filter((a)=>a.options.length===minol);
  const pickgrid = random(gridcopy);
//   console.table(pickgrid);
  return pickgrid;
}
function isValidCoordinate(x,y)
{
    return x>0&&x<dim&&y>0&&y<dim;
}
function mousePressed()
{
    for(let i=0;i<dim;i++)
    {
     for(let j=0;j<dim;j++)
         grid[i+j*dim] = {
             collapsed: false,
             options: [b,d,l,r,u],
             img:0,
             index:[i,j]
         };
    }
  loop();
}
function reduceOptions(grid,x,y,cr,m)
{
    let oi_img = dir[grid[cr[0]+cr[1]*dim].img];
    let combined = oi_img + m;
    const arr_split = [];
    let str = rules[combined];
    for(let i =0 ; i<str.length;i++)
    arr_split[i] = keys[str[i]];
    grid[x+y*dim].options = arr_split.slice();
    return grid;
}
function draw()
{
    background(0);
    const w = width/dim;
    const h = height/dim;
    const ans = minentropy(grid);
    let idx = ans.index[0] + ans.index[1]*dim;
    let cr = ans.index;
    grid[idx].collapsed = true;
    grid[idx].img = random(ans.options);
    const dx = [1,-1,0,0];
    const dy= [0,0,1,-1];
    const m = ["r","l","d","u"];
    for(let i=0;i<4;i++)
    {
        if(isValidCoordinate(cr[0]+dx[i],cr[1]+dy[i]))
        {
            grid = reduceOptions(grid,cr[0]+dx[i],cr[1]+dy[i],cr,m[i]);
        }
    }
    for(let i=0;i<dim;i++)
    {
        for(let j=0;j<dim;j++)
        {
            if(grid[i+j*dim].collapsed)
            {
                image(tiles[grid[i+j*dim].img],i*w,j*h,w,h);
            }
            else
            {
                fill(0);
                stroke(255);
                rect(i*w,j*h,w,h);
            }
        }
    }
    if(!grid.find(cell => !cell.collapsed))
    noLoop();

}