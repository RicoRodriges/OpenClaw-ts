import React from "react";
// import GameApp from "../game/GameApp";
//
// export default class SvgComponent extends React.Component {
//     scale = 30.0;
//     Box2D: any;
//     NUM = 5;
//     bodies: any[] = [];
//     ground: any;
//     boxSize = 20.0;
//     world: any;
//     anim = {count: 8, src: 'sprites/claw_idle.png', w: 592, h: 116};
//     currentAnim = 0;
//
//     gameApp: GameApp;
//
//     constructor(props: Readonly<{}>) {
//         super(props);
//         this.gameApp = new GameApp();
//
//         // @ts-ignore
//         this.Box2D = window.Box2D();
//         const Box2D = this.Box2D;
//
//         const gravity = new Box2D.b2Vec2(0.0, 10.0);
//         this.world = new Box2D.b2World(gravity);
//
//         const bd_ground = new Box2D.b2BodyDef();
//         this.ground = this.world.CreateBody(bd_ground);
//
//         const shape0 = new Box2D.b2EdgeShape();
//         shape0.Set(new Box2D.b2Vec2(0.0, 600.0 / this.scale), new Box2D.b2Vec2(600.0, 600.0 / this.scale));
//         this.ground.CreateFixture(shape0, 0.0);
//
//         const shape = new Box2D.b2PolygonShape();
//         shape.SetAsBox(this.boxSize / 2 / this.scale, this.boxSize / 2 / this.scale);
//         const shapeDef = new Box2D.b2FixtureDef();
//         shapeDef.set_density(2.0);
//         shapeDef.set_friction(1);
//         shapeDef.set_restitution(0);
//         shapeDef.set_shape(shape);
//
//         const ZERO = new Box2D.b2Vec2(0.0, 0.0);
//         for (let i = 0; i < this.NUM; ++i) {
//             const bd = new Box2D.b2BodyDef();
//             bd.set_type(Box2D.b2_dynamicBody);
//             bd.set_position(ZERO);
//             const body = this.world.CreateBody(bd);
//             body.CreateFixture(shapeDef);
//             this.bodies.push(body);
//         }
//
//         const resetPositions = () => {
//             let i = 0;
//             this.bodies.forEach((body) => {
//                 //const temp = new Box2D.b2Vec2((300 + 250 * (Math.random() - 0.5)) /this.scale, 0 + 250 * (Math.random() - 0.5) /this.scale);
//                 const temp = new Box2D.b2Vec2(300 / this.scale, (this.boxSize + 10) * i++ / this.scale);
//                 body.SetTransform(temp, 0);
//                 body.SetLinearVelocity(ZERO);
//                 body.SetAwake(1);
//                 body.SetActive(1);
//             });
//         };
//
//         resetPositions();
//
//         this.state = {};
//
//         // const readObject = (i: number, data: any) => {
//         //     const body = this.bodies[i];
//         //     const bpos = body.GetPosition();
//         //     data.x = bpos.get_x();
//         //     data.y = bpos.get_y();
//         //     data.angle = body.GetAngle();
//         // };
//         //
//         // var lastInactivity = Date.now();
//         // const someInactive = () => {
//         //     var asleep = 0;
//         //     for (var i = 0; i < NUM; i++) {
//         //         if (!bodies[i+1].IsAwake()) {
//         //             asleep++;
//         //             if (asleep == 3) return true;
//         //         }
//         //     }
//         //     return false;
//         // }
//         //
//         // // Main demo code
//         //
//         // const restart = () => {
//         //     totalTime = 0;
//         //     resetPositions();
//         // }
//         //
//         // var totalTime = 0;
//         //
//         // var boxes = [];
//         //
//         // var position = [0,0,0];
//         //
//         // var LAST = 0;
//         //
//         //
//         // var fpsInfo = {
//         //     dts: 0,
//         //     num: 0,
//         //     lastHUD: Date.now(),
//         //     allNum: 0,
//         //     all: 0,
//         // };
//         //
//         // var outElement = null;
//         // const showFPS = (dt) => {
//         //     if (!outElement) outElement = document.getElementById('out');
//         //     var now = Date.now();
//         //     fpsInfo.dts += dt;
//         //     fpsInfo.num++;
//         //     if (now - fpsInfo.lastHUD > 500) {
//         //         var curr = 1/(fpsInfo.dts/fpsInfo.num);
//         //         fpsInfo.allNum++;
//         //         var alpha = Math.min(1, 2/fpsInfo.allNum);
//         //         fpsInfo.all = alpha*curr + (1-alpha)*fpsInfo.all;
//         //         outElement.value = Math.round(curr) + ' / ' + Math.round(fpsInfo.all);
//         //         fpsInfo.lastHUD = now;
//         //         fpsInfo.dts = 0;
//         //         fpsInfo.num = 0;
//         //     }
//         // }
//         //
//         // var FLOOR_SIZE = 100;
//         // var FLOOR_HEIGHT = -56
//
//         // CubicVR code
//
//         // document.getElementById('info').innerHTML = '<b>Boxes: ' + NUM + '</b>';
//         //
//         // var canvas = document.getElementById("canvas");
//         // canvas.width = screen.width*0.70;
//         // canvas.height = screen.height*0.55;
//         //
//         // var gl = CubicVR.GLCore.init(canvas);
//         //
//         // if (!gl) {
//         //     alert("Sorry, no WebGL support :(");
//         //     return;
//         // };
//         //
//         // var scene = new CubicVR.Scene(canvas.width, canvas.height, 70);
//         //
//         // var light = new CubicVR.Light({
//         //     type:CubicVR.enums.light.type.POINT,
//         //     position: [0, 0, 5],
//         //     intensity: 0.9,
//         //     areaCeiling: 80,
//         //     areaFloor: FLOOR_HEIGHT,
//         //     areaAxis: [15, 10],
//         //     distance: 60,
//         //     mapRes: 1024
//         // });
//         // scene.bindLight(light);
//         //
//         // scene.camera.position = [0, 2.4, 17];
//         // scene.camera.target = [0, 2.4, 0];
//         //
//         // var boxMeshes = [];
//         // for (var i = 0; i < 5; i++) {
//         //     boxMeshes[i] = new CubicVR.primitives.box({
//         //         size: 2.0,
//         //         material: new CubicVR.Material({
//         //             textures: {
//         //                 color: new CubicVR.Texture("cube" + ((i % 5)+1) + ".jpg")
//         //             }
//         //         }),
//         //         uvmapper: {
//         //             projectionMode: CubicVR.enums.uv.projection.CUBIC,
//         //             scale: [2, 2, 2]
//         //         }
//         //     }).calcNormals().triangulateQuads().compile().clean();
//         // }
//         //
//         // for (var i = 0; i < NUM; i++) {
//         //     boxes[i] = new CubicVR.SceneObject({ mesh: boxMeshes[i%5], position: [0, -10000, 0] });
//         //     scene.bindSceneObject(boxes[i], true);
//         // }
//         //
//         // var floorMaterial = new CubicVR.Material({
//         //     textures: {
//         //         color: new CubicVR.Texture("cube3.jpg")
//         //     }
//         // });
//         // var floorMesh = new  CubicVR.primitives.box({
//         //     size: FLOOR_SIZE,
//         //     material: floorMaterial,
//         //     uvmapper: {
//         //         projectionMode: CubicVR.enums.uv.projection.CUBIC,
//         //         scale: [4, 4, 4]
//         //     }
//         // }).calcNormals().triangulateQuads().compile().clean();
//         //
//         // var floor_ = new CubicVR.SceneObject({ mesh: floorMesh, position: [0, FLOOR_HEIGHT, 0] });
//         // scene.bindSceneObject(floor_, true);
//         //
//         // //var mvc = new CubicVR.MouseViewController(canvas, scene.camera);
//
//         // CubicVR.MainLoop(function(timer, gl) {
//         //     var dt = timer.getLastUpdateSeconds();
//         //     simulate(dt);
//         //     scene.updateShadows();
//         //     scene.render();
//         //     showFPS(dt);
//         // });
//     }
//
//     componentDidMount() {
//         this.simulate(1 / 30.);
//     }
//
//     simulate(dt: number) {
//         // this.world.Step(dt, 8, 3);
//         // this.world.Step(dt, 1, 1);
//         this.currentAnim = (this.currentAnim + 1) % this.anim.count;
//         this.setState({});
//         // setTimeout(() => this.simulate(1 / 30.), 1000 / 30.)
//         //74x116
//     }
//
//     render() {
//         // return (
//         //     <svg width={600} height={610} style={{border: '1px solid black'}}>
//         //         {this.bodies.map((b, i) => {
//         //             const x = b.GetPosition().get_x() * this.scale - this.boxSize / 2;
//         //             const y = b.GetPosition().get_y() * this.scale - this.boxSize / 2;
//         //             return <rect key={i}
//         //                   x={x}
//         //                   y={y}
//         //                   width={this.boxSize}
//         //                   height={this.boxSize}
//         //                   transform={`rotate(${b.GetAngle() / Math.PI * 180} ${x + this.boxSize / 2} ${y + this.boxSize / 2})`}
//         //             />
//         //         })}
//         //         <rect x={0}
//         //               y={600}
//         //               width={600}
//         //               height={1}
//         //         />
//         //     </svg>
//         // );
//         return (
//             <svg width={600}
//                  height={610}
//                  style={{border: '1px solid black'}}
//                  onKeyDown={this.gameApp.gameLogic.gameView.onKeyDown}
//                  onKeyUp={this.gameApp.gameLogic.gameView.onKeyUp}>
//                 <defs>
//                     {
//                         (() => {
//                             const res = [];
//                             for (let i = 0; i < this.anim.count; ++i) {
//                                 res.push((
//                                     <pattern id={`anim${i}`}
//                                              x="0"
//                                              y="0"
//                                              patternUnits="objectBoundingBox"
//                                              height={this.anim.h}
//                                              width={this.anim.w / this.anim.count}>
//                                         <image x={-this.anim.w / this.anim.count * i}
//                                                y="0"
//                                                height={this.anim.h}
//                                                width={this.anim.w}
//                                                href={this.anim.src}/>
//                                     </pattern>
//                                 ));
//                             }
//                             return res;
//                         })()
//                     }
//                 </defs>
//
//                 <rect x={200}
//                       y={300}
//                       width={this.anim.w / this.anim.count}
//                       height={this.anim.h}
//                       fill={`url(#anim${this.currentAnim})`}
//                 />
//             </svg>
//         );
//     }
// }
