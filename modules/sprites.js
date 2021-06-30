// Load all the sprites
function loadSprites() {
  loadRoot('/images/')
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


  loadRoot('/images/brick/')
  loadSprite('brick', 'brick.png')
  loadSprite('brick-top', 'brickT.png')
  loadSprite('brick-right', 'brickR.png')
  loadSprite('brick-bottom', 'brickB.png')
  loadSprite('brick-left', 'brickL.png')
  loadSprite('brick-top-right', 'brickTR.png')
  loadSprite('brick-top-left', 'brickTL.png')
  loadSprite('brick-bottom-right', 'brickBR.png')
  loadSprite('brick-bottom-left', 'brickBL.png')

  loadRoot('/images/lever/')
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
}
export { loadSprites };