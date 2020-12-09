import { Component, Inject, OnInit } from '@angular/core';
import { IPFS } from './ipfs';
import {Buffer} from 'buffer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  public hash: string;

  // Inject the ipfs injection token
  constructor(@Inject(IPFS) private ipfs) {}

  // ngOnInit() {
  //   // Wait for the ipfs node to be ready
  //   this.ipfs.on('ready', async () => {
  //     // Get the version
  //     const version = await this.ipfs.version();
  //     console.log({version});
  //     // Add a file in IPFS
  //     const filesAdded = await this.ipfs.files.add({
  //       path: 'hello.txt',
  //       content: Buffer.from('Hello World')
  //     });
  //     console.log('Added file:', filesAdded[0].path, filesAdded[0].hash);
  //     // Read the file from IPFS
  //     const fileBuffer = await this.ipfs.files.cat(filesAdded[0].hash);
  //     console.log('Added file contents:', fileBuffer.toString());
  //   });
  // }

  async ngOnInit() {
    const version = await this.ipfs.version();
    console.log({version});
  }

  public async set(path: string, value: string) {
    const content = Buffer.from(value);
    const filesAdded = await this.ipfs.files.add({path, content});
    this.hash = filesAdded[0].hash;
  }

  public async get(hash: string) {
    const fileBuffer = await this.ipfs.files.cat(hash);
    console.log(fileBuffer.toString());
  }

  selectedFile: File = null;

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    console.log("CLICK");
    // const fd = new FormData();
    // fd.append('image', this.selectedFile, this.selectedFile.name)
    // this.http.post('my-backend.com/file-upload', fd).subscribe(res => {
    //   console.log(res);
    // })
  }
}
