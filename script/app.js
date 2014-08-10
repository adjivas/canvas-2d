/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: adjivas <adjivas@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2014/05/19 16:01:55 by adjivas           #+#    #+#             */
/*   Updated: 2014/05/19 16:01:57 by adjivas          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

CANVAS = 'canvas';

COLOR = '#0000FF';

GRADIAN = 400;

X_ABSCISSA = 300;

Y_ORDINATE = 300;

Z_APPLICATE = 200;

/*
** The function returns void and draws a simple point according to
** coordonate and color.
*/

/*! Is a specific block instruction natif from 2d's canvas. */

/*
** 0  1 2 3 4 5 6 7 .
**  .---------- - -
** 1|
** 2|
**   
** 4|
**        · [4 ; 6] (crd x, crd y)
** 6|      
** .
*/

function canvas_orgn2_point(argument) {
  'use strict';
  var ctx = argument.context;
  var clr = argument.clr ? argument.clr : COLOR;
  var crd = argument.crd;

  ctx.beginPath();
  ctx.moveTo(crd.x - 0.5, crd.y - 1.5);
  ctx.lineTo(crd.x + 0.5, crd.y + 1.5);
  ctx.strokeStyle = clr;
  ctx.stroke();
  return ;
}

/*
** The function returns void and draws a segment.
*/

/*
** 0  1 2 3 4 5 6 7 .
**  .---------- - -
** 1| \ [1 ; 1] (str x, str y)
** 2|  \
**      \ unt
** 4|    \
**        \ [4 ; 6] (end x, end y)
** 6|      \
** .
*/

function canvas_orgn2_segt(argument) {
  'use strict';
  var cvs = argument;
  var str = argument.str;
  var end = argument.end;
  var unt = argument.unt;
  var ctx = (end.x - str.x) / (unt);
  var cty = (end.y - str.y) / (unt);

  while (unt--) {
    str = {'x': str.x + ctx, 'y': str.y + cty};
    cvs.crd = str;
    canvas_orgn2_point(cvs);
  }
  return ;
}

/*
** The function returns void and calls the draw of a line from according to
** unit and origin. The mesure's unity is the gon.
*/

/* The measure' unit used is the gradian 0 - 399. */

/*              angle (ngl)
**           |   /
**           |  /
**           | /
**           |/
** 0---------O---------399
**          /|
**         / |
**        /  |
**       /   |
*/

function canvas_orgn4_line_horizontal(argument) {
  'use strict';
  var cvs = argument;
  var spc = argument.space;
  var ngl = argument.ngl;
  var org = argument.org;
  var end = 0;

  if (0 <= ngl && ngl < 100)
    end = {'x': 0, 'y': org.y - org.y / 100 * (ngl)};
  else if (0 <= ngl && ngl < 300)
    end = {'x': org.x / 100 * (ngl - 100), 'y': 0};
  else if (0 <= ngl && ngl < GRADIAN)
    end = {'x': spc.x, 'y': org.y / 100 * (ngl - 300)};
  cvs.unt = spc.x;
  cvs.str = {'x': spc.x - end.x, 'y': spc.y - end.y};
  cvs.end = {'x': end.x, 'y': end.y};
  canvas_orgn2_segt(cvs);
  return ;
}

/*
** The function returns void and calls the draw of a line from according to
** unit and origin. The mesure's unity is the gon.
*/

/* The measure' unit used is the gradian 0 - 399. */

/*           0  angle (ngl)
**           |   /
**           |  /
**           | /
**           |/
**  ---------O---------
**          /|
**         / |
**        /  |
**       /   |
**          399
*/

function canvas_orgn4_line_vertical(argument) {
  'use strict';
  var cvs = argument;
  var spc = argument.space;
  var ngl = argument.ngl;
  var org = argument.org;
  var end = 0;

  if (0 <= ngl && ngl < 150)
    end = {'x': org.x - org.x / 100 * (ngl), 'y': spc.y};
  else if (150 <= ngl && ngl < 300)
    end = {'x': spc.x, 'y': org.y / 100 * (ngl - 100)};
  else if (300 <= ngl && ngl < GRADIAN)
    end = {'x': org.x / 100 * (ngl - 300), 'y': 0};
  cvs.unt = spc.x;
  cvs.str = {'x': spc.x - end.x, 'y': spc.y - end.y};
  cvs.end = {'x': end.x, 'y': end.y};
  canvas_orgn2_segt(cvs);
  return ;
}

/*
** The function returns the coordonnate of a point according to
** unit and origin -X_ABSCISSA- -Y_ORDINATE- -Z_APPLICATE-.
*/

/*
**  unt
**  <->      y    z
**           |   /
**           |  /
**           | /   · crd [x, y, z]
**           |/         
**  ---------O--------- x
**          /|
**         / |
**        /  |
**       /   |
*/

function math_orgn6_opoint(argument) {
  'use strict';
  var unt = argument.unt;
  var org = argument.org;
  var crd = argument.crd;
  var lim = {'x': (X_ABSCISSA - 200) / 100, 'z': (Z_APPLICATE - 200) / 100,
             'y': (Y_ORDINATE - 200) / 100};
  var ptx = (org.x + crd.x * unt) + (lim.y * unt * crd.y)
          + (lim.z * unt * crd.z);
  var pty = org.y - (crd.y * unt) + (lim.x * unt * crd.x) - (crd.z * unt);

  return ({'x': ptx, 'y': pty});
}

/*
** The function returns the Greatest Common Divisor between x and y -GCD-.
*/

function math_gcd(argument) {
  'use strict';
  var x = argument.x;
  var y = argument.y;

  if (y != 0)
   return (math_gcd({'x': y, 'y': x % y}));
  return (x);

}

/*
** The function returns the list divisors of the number.
*/

function math_list_divisors(argument) {
  'use strict';
  var number   = argument.number;
  var divisors = [];
  var divisor;
 
  for (divisor = number; divisor > 1; divisor--)
    if (!(number % divisor))
      divisors.push(divisor);
  return (divisors);
}

/*
**
*/

function math_rgb_to_hex(argument) {
  var r = argument.r;
  var g = argument.g;
  var b = argument.b;

  return ("#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1));
}

/*
** The function returns void and calls the draw of a point from Y_ordinate 
** according to unit and origin -X_ABSCISSA- -Y_ORDINATE-.
*/

/*
**  unt
**  <->      y    
**           |
**           |
**           |     · crd [x, y]
**           |
**  ---------O--------- x
**           |
**           |
**           |
**           |
*/

function canvas_orgn4_opoint(argument) {
  'use strict';
  var cvs = argument;
  var spc = argument.space;
  var unt = argument.unt;
  var org = argument.org;
  var clr = argument.clr;
  var crd = argument.crd;
  var lim = {'x': (X_ABSCISSA - 200) / 100, 'y': (Y_ORDINATE - 200) / 100};
  var ptx = org.x + (crd.x * unt) + (lim.y * unt * crd.y);
  var pty = org.y - (crd.y * unt) + (lim.x * unt * crd.x);

  cvs.crd = {'x': ptx, 'y': pty};
  canvas_orgn2_point(cvs);
  return ;
}

/*
** The function returns void and calls the draw of a point from Y_ordinate 
** according to unit and origin -X_ABSCISSA- -Y_ORDINATE-.
*/

/*
**  unt
**  <->      y    z
**           |   /
**           |  /
**           | /   · crd [x, y, z]
**           |/ 
**  ---------O--------- x
**          /| 
**         / |
**        /  |
**       /   |
*/

function canvas_orgn6_opoint(argument) {
  'use strict';
  var cvs = argument;
  var spc = argument.space;
  var unt = argument.unt;
  var org = argument.org;
  var clr = argument.clr;
  var crd = argument.crd;
  var lim = {'x': (X_ABSCISSA - 200) / 100, 'z': (Z_APPLICATE - 200) / 100,
             'y': (Y_ORDINATE - 200) / 100};
  var ptx = (org.x + crd.x * unt) + (lim.y * unt * crd.y)
          + (lim.z * unt * crd.z);
  var pty = org.y - (crd.y * unt) + (lim.x * unt * crd.x) - (crd.z * unt);

  cvs.crd = {'x': ptx, 'y': pty};
  canvas_orgn2_point(cvs);
  return ;
}

/*
** The function returns void and draw a cube according to origin.
*/

/*
**                   
**           y    z
**           |   /   7__6
**           |  /   4/_5|
**           | /   3|/|/2
**           |/    0·-·1
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn6_ocube6(argument) {
  'use strict';
  var unt = argument.unt;
  var org = argument.org;
  var crd = argument.crd;
  var cdr = [[0, 1], [1, 2], [2, 3], [0, 3], [3, 7], [0, 4],
             [4, 7], [4, 5], [5, 6], [6, 7], [1, 5], [2, 6]];
  var prt = [{'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 1}];
  var ard = [];
  var cnt;

  for (cnt = prt.length - 1; cnt >= 0; cnt--)
    ard[cnt] = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[cnt]});
  for (cnt = cdr.length - 1; cnt >= 0; cnt--) {
    argument.str = ard[cdr[cnt][0]];
    argument.end = ard[cdr[cnt][1]];
    canvas_orgn2_segt(argument);
  }
  return ;
}
/*
** The function returns void and draw a cube according to origin.
*/

/*
**                   
**           y    z
**           |   /  7__6
**           |  /  4/_5/|
**           | /    | |/2
**           |/    0·-·1
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn6_ocube4(argument) {
  'use strict';
  var unt = argument.unt;
  var org = argument.org;
  var crd = argument.crd;
  var cdr = [[0, 1], [1, 2], [2, 3], [0, 3], [3, 7],
             [5, 6], [6, 7], [1, 5], [2, 6]];
  var prt = [{'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 1},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 1}];
  var ard = [];
  var cnt;

  for (cnt = prt.length - 1; cnt >= 0; cnt--)
    ard[cnt] = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[cnt]});
  for (cnt = cdr.length - 1; cnt >= 0; cnt--) {
    argument.str = ard[cdr[cnt][0]];
    argument.end = ard[cdr[cnt][1]];
    canvas_orgn2_segt(argument);
  }
  return ;
}

/*
** The function returns void and draw a surface according to origin.
*/

/*
**                   
**           y    z
**           |   /  
**           |  /   __
**           | /   /_/ 
**           |/    
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn6_surface(argument) {
  'use strict';
  var unt = argument.unt;
  var org = argument.org;
  var crd = argument.crd;
  var cdr = [[0, 1], [0, 2],
             [2, 3], [1, 3]];
  var prt = [{'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 0}];
  var ard = [];
  var cnt;

  for (cnt = prt.length - 1; cnt >= 0; cnt--)
    ard[cnt] = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[cnt]});
  for (cnt = cdr.length - 1; cnt >= 0; cnt--) {
    argument.str = ard[cdr[cnt][0]];
    argument.end = ard[cdr[cnt][1]];
    canvas_orgn2_segt(argument);
  }
  return ;
}

/*
** The function returns void and draw a colored surface according to origin
** and with the color.
*/

/*
**                   
**           y    z
**           |   /  
**           |  /   __
**           | /   /█/ 
**           |/    
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn2_segt(argument) {
  'use strict';
  var cvs = argument;
  var str = argument.str;
  var end = argument.end;
  var unt = argument.unt;
  var ctx = (end.x - str.x) / (unt);
  var cty = (end.y - str.y) / (unt);

  while (unt--) {
    str = {'x': str.x + ctx, 'y': str.y + cty};
    cvs.crd = str;
    canvas_orgn2_point(cvs);
  }
  return ;
}

/*
** The function returns void and draw a colored surface according to origin
** and with texture.
*/

/*              
**           y    z
**           |   /   ___
**           |  /   /--/
**           | /   /--/ 
**           |/    
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn2_multisegt(argument) {
  'use strict';
  var cvs = argument;
  var ard = argument.ard;
  var prt = argument.prt;
  var unt = argument.unt;
  var org = argument.org;
  var cdr = [[0, 1], [0, 2], [2, 3], [1, 3]];
  var psl = ard[cdr[2][1]];
  var psr = ard[cdr[1][1]];
  var end = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[2]});
  var str = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[0]});
  var crd = {'x': (end.x - str.x) / unt, 'y': (end.y - str.y) / unt};
  var cnt;

  for (cnt = unt; cnt >= 0; cnt--) {
    cvs.str = {'x': psl.x + (cnt * crd.x), 'y': psl.y + (cnt * crd.y)};
    cvs.end = {'x': psr.x + (cnt * crd.x), 'y': psr.y + (cnt * crd.y)};
    canvas_orgn2_segt(cvs);
  }
  return ;
}

/*
** The function returns void and draw a colored surface according to origin
** and with color.
*/

/*
**                   
**           y    z
**           |   /  
**           |  /   __
**           | /   /█/ 
**           |/    
**  ---------O--------- x
**          /|  crd [x, y, z]
**         / |  unt <->
**        /  |
**       /   |
*/

function canvas_orgn6_csurface(argument) {
  'use strict';
  var cvs = argument;
  var unt = argument.unt;
  var org = argument.org;
  var crd = {'x': argument.crd.x, 'y': argument.crd.y - 1, 'z': argument.crd.z};
  var prt = [{'x': crd.x + 0, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 0, 'z': crd.z + 0},
             {'x': crd.x + 0, 'y': crd.y + 1, 'z': crd.z + 0},
             {'x': crd.x + 1, 'y': crd.y + 1, 'z': crd.z + 0}];
  var ard = [];
  var ctc = [];
  var cnt;

  for (cnt = prt.length - 1; cnt >= 0; cnt--)
    ard[cnt] = math_orgn6_opoint({'unt': unt, 'org': org, 'crd': prt[cnt]});
  cvs.ard = ard;
  cvs.prt = prt;
  cvs.crd = crd;
  canvas_orgn2_multisegt(cvs);
  return ;
}

/* WORK. */

function TEST(argument) {
  'use strict';
  var mtrx = argument;
  var spc = argument.space;
  var limit = math_gcd({'x': spc.x, 'y': spc.y});
  var units = math_list_divisors({'number': limit});
  var line = Object.create(mtrx);
  var unit;

  line.unt = 50;
  line.crd = {'x': 0, 'y': 0, 'z': -1};
  canvas_orgn6_ocube6(line);
  line.crd = {'x': 0, 'y': 1, 'z': -1};
  canvas_orgn6_ocube6(line);
  line.crd = {'x': 1, 'y': 0, 'z': -1};
  canvas_orgn6_ocube6(line);

  var pont = Object.create(mtrx);
  pont.clr = "#00FFFF";
  pont.unt = 50;
  pont.crd = {'x': 0, 'y': 0, 'z': 0};
  canvas_orgn6_csurface(pont);
  pont.crd = {'x': 0, 'y': 1, 'z': 0};
  canvas_orgn6_csurface(pont);
  pont.crd = {'x': 1, 'y': 0, 'z': 0};
  canvas_orgn6_csurface(pont);

  line.clr = COLOR;
  line.ngl = X_ABSCISSA;
  canvas_orgn4_line_vertical(line);
  line.ngl = Y_ORDINATE;
  canvas_orgn4_line_horizontal(line);
  line.ngl = Z_APPLICATE;
  canvas_orgn4_line_horizontal(line);
  return ;
}

function main() {
  'use strict';
  var canvas = document.getElementsByTagName(CANVAS)[0];
  var argument = {
    'canvas': canvas,
    'context': canvas.getContext('2d'),
    'space': {'x': canvas.width, 'y': canvas.height},
    'org': {'x': canvas.width / 2, 'y': canvas.height / 2}
  };

  if (argument.context)
    TEST(argument);
  return ;
}
