kaboom({
  global: true,
  fullscreen: true,
  scale: 1.5,
  debug: true,
  clearColor: [0, 0, 0, 1]
})

const PLAYER_MOVE_SPEED = 80

loadRoot('images/')
// loadSprite('dirt', 'dirtBg.png')
loadSprite('bg', 'simpleBg.png')
loadSprite('lever', 'lever.png')
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

scene('game', ({ level, score }) => {
    layers(['bg', 'obj', 'ui'], 'obj')

    const map = [
      '1bbbb21b  b2',
      'a    Aa    A',
      'a          A',
      'a          A',
      'a    Aa    A',
      '4B  B34BBBB3',
      '1b  b21bbbb2',
      'a    Aa    A',
      'a          A',
      'a        l A',
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
      // ' ': [sprite('dirt')],
      'l': [sprite('lever'), solid()]
    }

    addLevel(map, levelCfg)

    add([sprite('bg'), layer('bg')])

    const player = add([
      sprite('player'),
      pos(136,4)
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

    // Move and animate the player when any of the keyboard
    // arrows are pressed
    function movePlayer (dirAnimate, speedX, speedY) {
      player.move(speedX, speedY)
      if (player.curAnim() !== dirAnimate) {
        player.play(dirAnimate)
      }
    }
    keyDown('left', () => {
      movePlayer('moveLeft', -PLAYER_MOVE_SPEED, 0)
    })
    keyDown('right', () => {
      movePlayer('moveRight', PLAYER_MOVE_SPEED, 0)
    })
    keyDown('up', () => {
      movePlayer('moveUp', 0, -PLAYER_MOVE_SPEED)
    })
    keyDown('down', () => {
      movePlayer('moveDown', 0, PLAYER_MOVE_SPEED)
    })

    // If user releases all direction keys show the
    // "idle" sprite of the player
    function idlePlayer (direction) {
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

})

start('game', { level: 0, score: 0 })