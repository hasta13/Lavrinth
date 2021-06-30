// import { loadSprites } from './modules/sprites.js';

// alert('is this thing working??');

kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 0, 0, 1]
})

const PLAYER_MOVE_SPEED = 80

// load the sprites
// loadSprites();
loadRoot('images/')
loadSprite('dirt', 'dirt.png')
// loadSprite('bg', 'simpleBg.png')
loadSprite('interact', 'transparent16pxSquare.png')
loadSprite("player", "playerSheet.png", {
  sliceX: 3,
  sliceY: 4,
  anims: {
    idleRight: {
      from: 0,
      to: 0,
    },
    moveRight: {
      from: 1,
      to: 2,
    },
    idleLeft: {
      from: 3,
      to: 3,
    },
    moveLeft: {
      from: 4,
      to: 5,
    },
    idleUp: {
      from: 6,
      to: 6,
    },
    moveUp: {
      from: 7,
      to: 8,
    },
    idleDown: {
      from: 9,
      to: 9,
    },
    moveDown: {
      from: 10,
      to: 11,
    },
  },
});


loadRoot('images/brick/')
loadSprite('brick', 'brick.png')
loadSprite('brick-top', 'brickT.png')
loadSprite('brick-right', 'brickR.png')
loadSprite('brick-bottom', 'brickB.png')
loadSprite('brick-left', 'brickL.png')
loadSprite('brick-top-right', 'brickTR.png')
loadSprite('brick-top-left', 'brickTL.png')
loadSprite('brick-bottom-right', 'brickBR.png')
loadSprite('brick-bottom-left', 'brickBL.png')

loadRoot('images/lever/')
loadSprite('lever', 'leverSheet.png', {
  sliceX: 5,
  anims: {
    moveRight: {
      from: 0,
      to: 4
    },
    idleRight: {
      from: 4,
      to: 4
    },
    idleLeft: {
      from: 0,
      to: 0
    }
  }
})
loadSprite('lever1', 'lever1.png')
loadSprite('lever2', 'lever2.png')
loadSprite('lever3', 'lever3.png')
loadSprite('lever4', 'lever4.png')
loadSprite('lever5', 'lever5.png')

scene('game', ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const map = [
    '1bbbb21bbbb2',
    'a    Aa    A',
    'a l        A',
    'a          A',
    'a    Aa    A',
    '4B  B34BBBB3',
    '1b==b21bbbb2',
    'a    Aa    A',
    'a          A',
    'a          A',
    'a    Aa    A',
    '4BBBB34BBBB3'
  ]
  
  const levelCfg = {
    width: 16,
    height: 16,
    'r': [sprite('brick'), solid()],
    'b': [sprite('brick-top'), solid()],
    'B': [sprite('brick-bottom'), solid()],
    'a': [sprite('brick-left'), solid()],
    'A': [sprite('brick-right'), solid()],
    '1': [sprite('brick-top-left'), solid()],
    '2': [sprite('brick-top-right'), solid()],
    '3': [sprite('brick-bottom-right'), solid()],
    '4': [sprite('brick-bottom-left'), solid()],
    'x': [sprite('dirt'), layer('bg'), 'player-start'],
    ' ': [sprite('dirt'), layer('bg')],
    'l': [sprite('dirt'), sprite('lever'), solid(), 'lever', { state: 'left' }],
    '=': [sprite('brick-top'), solid(), 'door']
  }

  const gameLevel = addLevel(map, levelCfg)

  // const doors = get('door');
  // door.gridPos.sub(0, 0)

  const player = add([
    sprite('player'),
    // pos(get('player-start')[0].gridPos),
    pos(140,40),
    {
      dir: vec2(1, 0),
      // status: 'idle'
    }
  ])

  // Do this to prevent player from walking through
  // walls (or solid objects)
  player.action(() => {
    player.resolve()
  })

  // Move the camera positioned over the player
  player.action(() => {
    camPos(player.pos);
  });

  // Move the player when any of the keyboard
  // arrows are held down
  function movePlayer(speedX, speedY) {
    player.move(speedX, speedY);
  }
  keyDown('left', () => {
    movePlayer(-PLAYER_MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })
  keyDown('right', () => {
    movePlayer(PLAYER_MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })
  keyDown('up', () => {
    movePlayer(0, -PLAYER_MOVE_SPEED)
    player.dir = vec2(0, -1)
  })
  keyDown('down', () => {
    movePlayer(0, PLAYER_MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  // Animate the player when any of the keyboard
  // arrows are pressed initially
  function animatePlayer(dirAnimate) {
    if (player.curAnim() !== dirAnimate) {
      player.play(dirAnimate)
    }
  }
  keyPress('left', () => {
    animatePlayer('moveLeft')
    player.dir = vec2(-1, 0)
  })
  keyPress('right', () => {
    animatePlayer('moveRight')
    player.dir = vec2(1, 0)
  })
  keyPress('up', () => {
    animatePlayer('moveUp')
    player.dir = vec2(0, -1)
  })
  keyPress('down', () => {
    animatePlayer('moveDown')
    player.dir = vec2(0, 1)
  })

  // If user releases all direction keys show the
  // "idle" sprite of the player
  function idlePlayer(direction) {
    // as long as there isn't another key pressed
    // change the player image to idle
    r = !keyIsDown("right")
    l = !keyIsDown("left")
    u = !keyIsDown("up")
    d = !keyIsDown("down")
    if (r && l && u && d) {
      player.play(direction);
    }
  }
  keyRelease('left', () => {idlePlayer('idleLeft')})
  keyRelease('right', () => {idlePlayer('idleRight')})
  keyRelease('up', () => {idlePlayer('idleUp')})
  keyRelease('down', () => {idlePlayer('idleDown')})

  function interact(p) {
    // create dummy transparent object used to
    // collide with interactable objects
    const obj = add([
      sprite('interact'),
      pos(p),
      'interact'
    ])
    
    // destroy the dummy object after 200 ms
    wait(0.2, () => {
      destroy(obj)
    })
  }

  // interact with objects
  keyPress('space', () => {
    interact(player.pos.add(player.dir.scale(4)))
  })

  // What to do when player interacts with lever
  collides('interact', 'lever', (interact, lever) => {

    if (lever.state === 'left' && lever.state !== 'moving') {
      lever.state = 'moving';

      // animate lever movement
      wait(0.1, () => {
        lever.changeSprite('lever2');
      });
      wait(0.2, () => {
        lever.changeSprite('lever3');
      });
      wait(0.3, () => {
        lever.changeSprite('lever4');
      });
      wait(0.4, () => {
        lever.changeSprite('lever5');

        // Open the door by replacing it with dirt
        const doors = get('door');
        doors.forEach((door) => {
          door.solid = false;
          door.hidden = true;
          gameLevel.spawn(" ", door.gridPos.sub(0, 0));
        });
      });
      lever.state = 'right';
    } else if (lever.state === 'right' && lever.state !== 'moving') {
      lever.state = 'moving'

      // animate lever movement
      wait(0.1, () => {
        lever.changeSprite('lever4');
      });
      wait(0.2, () => {
        lever.changeSprite('lever3');
      });
      wait(0.3, () => {
        lever.changeSprite('lever2');
      });
      wait(0.4, () => {
        lever.changeSprite('lever1');

        // Close the door
        const doors = get('door');
        doors.forEach((door) => {
          door.solid = true;
          door.hidden = false;
        });
      });
      lever.state = 'left';
    }
  })

})

start('game', { level: 0, score: 0 })