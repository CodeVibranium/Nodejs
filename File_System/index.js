const fs = require("fs");
const fsp = require("fs/promises");
const { findSourceMap } = require("module");
const os = require("os");

// console.log(fs.constants, "\n");
// readFileData("./data.txt");
// appendFileData("./appendData.txt", "Hello World \n");
// appendFileData("./appendData.txt", "Hello world, how are you ? \n");
// writeFileData("./writeData.txt", "This is write opearion on a file \n");
// accessFileData("./data.txt");
// fileStatsData("./data1.txt");
// copyFileData("./appendData.txt", "../data.txt");
// copyDir("../", os.homedir());
// makeDir("./b");
// makdeRecursiveDir("./a/b/c");
// openFile("./w.txt");
// readDirData("./");
// readDirDataWithFileTypes("./");
// readRealpath("./");
// renameFile("./data.txt", "content.txt");
// deleteDir("./b");
// deleteDirRecursively("./b");
// remove("./b");
// removeRecursively("./BCD/b+");
// truncatePath("./content.txt", 1000);
// unlinkFile("./AA");
// fileStatsData("./content.txt");
// createAFile("Hello.txt");

changeFilePermissions("./Hello.txt");
async function readFileData(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      await fsp.readFile(filePath, { encoding: "utf-8" });
      console.log("File Read successfully ");
    } else {
      throw {
        errno: -2,
        code: "ENOENT",
        syscall: "open",
        path: "./dat.txt",
      };
    }
  } catch (err) {
    console.log(err.code == "ENOENT" && "File dosent exists");
  }
}

async function appendFileData(filePath, content) {
  try {
    // if (!fs.existsSync(filePath)) {
    //the appendfile will create file if it dosent exist
    //appendfile will not overwirte data of a file
    // by default file encoding is utf-8
    //no need of checking if file exists if not it will create a file so,
    const data = await fsp.appendFile(filePath, content);
    console.log("File written successfully @ this", filePath);
    // } else throw "File dosent exists";
  } catch (err) {
    console.log(err);
  }
}

async function writeFileData(filePath, content) {
  try {
    // if (fs.existsSync(filePath)) {
    //will create a file if it dosent exists
    //writes data file, if file has data it will replace all data.
    //default encoding is utf-8
    //encoding is ignored if file write data is buffer.
    await fsp.writeFile(filePath, content);
    console.log("File Written successfully");
    // } else {
    //   throw "File dosent exists";
    // }
  } catch (err) {
    console.log(err, "writeFileData");
  }
}

async function accessFileData(filePath) {
  try {
    //will throw error if file dosent exists
    const data = await fsp.access(filePath, fs.constants.R_OK | fs.constants.W_OK);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function fileStatsData(filePath) {
  try {
    const stats = await fsp.stat(filePath);
    //will throw error if file dosent exists
    //stats can provide more data and the options are
    //https://nodejs.org/dist/latest-v18.x/docs/api/fs.html#class-fsstats
    //example
    console.log(stats.isBlockDevice(), "Block");
    console.log(stats.isCharacterDevice()), "Chart device";
    console.log(stats.isDirectory(), "Dir");
    console.log(stats.isFIFO(), "isFifo");
    console.log(stats.isFile(), "isFile");
    console.log(stats.isSocket(), "isSocket");
    console.log(stats.isSymbolicLink(), "isSoftLink");
    // console.log(stats.isFIFO());
    console.log(stats);
    //and many more
  } catch (err) {
    console.log(err);
  }
}

async function copyFileData(src, dest) {
  try {
    //src = path/buffer
    //dest = path/buffer
    //file data will be  overwritten if file already exists
    //returns undefined upon success
    const data = await fsp.copyFile(src, dest, { recursive: true, force: true });
    console.log(`${src} was copied to ${dest}`, data);
  } catch (err) {
    console.log(err);
  }
}

async function copyDir(src, dest) {
  try {
    //experimental
    const data = await fsp.cp(src, dest);
    console.log(`${src} was copied to ${dest}`, data);
  } catch (err) {
    console.log(err);
  }
}

async function makeDir(dirPath) {
  try {
    if (fs.existsSync("./a")) {
      //will throw error if dir already exists
      const data = await fsp.mkdir(dirPath);
      console.log(`${dirPath} created successfully`, data);
    } else {
      throw `Dir already exists ${dirPath}`;
    }
  } catch (err) {
    console.log(err);
  }
}

async function makdeRecursiveDir(dirPath) {
  try {
    await fsp.mkdir(dirPath, { recursive: true });
    console.log(`${dirPath} created successfully`);
  } catch (err) {
    console.log(err);
  }
}

async function openFile(filePath) {
  // try {
  //   const data = await fsp.open(filePath, "w+");
  //   //path-> specify the file to be opened
  //   //mode to which the file should be open (r,w,x)
  //   console.log(`${filePath} opened successfully`, data);
  // } catch (err) {
  //   console.log(err);
  // }
  fs.open("demo.txt", "w+", function (err, f) {
    if (err) {
      return console.error(err);
    }
    console.log(f);
    console.log("File opened!!");
  });
}
//what is the point of using tmpdir

async function readDirData(path) {
  try {
    //reads the content of the dir except . , ..
    //returns an array of the file names
    //takes encoding default utf-8
    //withFileType default-false
    const data = await fsp.readdir(path);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function readDirDataWithFileTypes(path) {
  try {
    //withFileType default-false
    //If options.withFileTypes is set to true, the resolved array will contain <fs.Dirent> objects.
    //A representation of a directory entry, which can be a file or a subdirectory within the directory,
    // dirent.isBlockDevice(), dirent.isCharacterDevice(), dirent.isDirectory(), dirent.isFIFO(), dirent.isFile(), dirent.isSocket()
    //dirent.isSymbolicLink(), dirent.name
    const data = await fsp.readdir(path, { withFileTypes: true });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function readRealpath(path) {
  try {
    //encoding <string> Default: 'utf8'
    //Determines the actual location of path using the same semantics as the fs.realpath.native() function.
    //Only paths that can be converted to UTF8 strings are supported.
    const data = await fsp.realpath(path);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function renameFile(oldname, newname) {
  try {
    // oldPath <string> | <Buffer> | <URL>
    // newPath <string> | <Buffer> | <URL>
    // Returns: <Promise> Fulfills with undefined upon success.
    //will thorw error if the file dosent exist
    await fsp.rename(oldname, newname);
    console.log("file renamed successfully");
  } catch (err) {
    console.log(err);
  }
}
async function deleteDir(dirPath) {
  try {
    // Removes the directory identified by path.
    // fsPromises.rmdir() on a file (not a directory) results in the promise being rejected
    // with an ENOENT error on Windows and an ENOTDIR error on POSIX.
    // To get a behavior similar to the rm -rf Unix command,
    // use fsPromises.rm() with options { recursive: true, force: true }.
    //will thorw an error if dir is not empty (such as havining anotyher dir etc...)
    await fsp.rmdir(dirPath);
    console.log(dirPath, "deleted successfully");
  } catch (err) {
    console.log(err);
  }
}
async function deleteDirRecursively(dirPath) {
  try {
    // fsPromises.rmdir() on a file (not a directory) results in the promise being rejected
    // with an ENOENT error on Windows and an ENOTDIR error on POSIX.
    // To get a behavior similar to the rm -rf Unix command,
    // use fsPromises.rm() with options { recursive: true, force: true }.
    //will not thorw error if dir is empty
    //will thow error if dir is not present
    //will delete all  dir
    await fsp.rmdir(dirPath, { recursive: true, force: true });
    console.log(dirPath, "deleted successfully");
  } catch (err) {
    console.log(err);
  }
}
async function remove(path) {
  try {
    //has ability to remove both file and dir
    //can delete dir recursively and forcefully
    await fsp.rm(path);
    console.log(path, "deleted successfully");
  } catch (err) {
    console.log(err);
  }
}
async function removeRecursively(path) {
  try {
    //has ability to remove both file and dir
    //can delete dir recursively and forcefully
    //will delete an empty dir.
    //will remove all the contents of a dir.
    // the only difference between rmdir and rm is that rmdir can only delete dir's
    await fsp.rm(path, { recursive: true, force: true });
    console.log(path, "deleted successfully");
  } catch (err) {
    console.log(err);
  }
}

async function truncatePath(path, lengthToTruncate = 0) {
  try {
    //EISDIR stands for "Error, Is Directory". This means that NPM is trying to do something to a file but it is a directory.
    //will only work file , if path is a dir will thow above error
    //If the file was larger than len bytes, only the first len bytes will be retained in the file and tthe rest will be removed

    //find the file size use fs.stat().size
    //The size of the file in bytes.
    //now truncate can remove the content of file by providing lesser bytes than the file size.
    //before content.txt was 304 lines size 91293,
    //after content.txt is recduced to 3 lines size 1000
    const data = await fsp.truncate(path, lengthToTruncate);
    console.log(data);
  } catch (err) {
    console.log(err, "hert");
  }
}

async function unlinkFile(path) {
  try {
    //primarly this method should be used for
    //1.if file provided is a symbolic link it will remove the linking file without affecting the original file
    //but this method can also do is a , if a file provided is nopt a symbolic link file then
    // it will just delete that file
    //willl thorw eroor if file dosent exist
    //[Error: EPERM: operation not permitted
    // will throw above error if path is a dir
    await fsp.unlink(path);
    console.log(path, "deleted successfully");
  } catch (err) {
    console.log(err);
  }
}

function createAFile(filename) {
  fs.closeSync(fs.openSync(filename, "w"));
  fs.createWriteStream(`1.txt`).end();
}

async function changeFilePermissions(filename) {
  try {
    //before -rw-r--r--  1 ali  staff     0B Aug 24 15:43 Hello.txt
    //filename, permissions(string,octet value (0o777))
    // Number	Description
    // 7	     read, write, and execute
    // 6       read and write
    // 5       read and excecute
    // 4       read only
    // 3       write and execute
    // 2       write only
    // 1       read onlly
    // 0       no permission
    //adter --wxrwxr-t  1 ali  staff     0B Aug 24 15:43 Hello.txt
    await fsp.chmod(filename, 0o777);
    console.log(filename, "permissions changes successfully");
  } catch (err) {
    console.log(err);
  }
}

async function changeFileOwnership(filename) {
  try {
    await fsp.chown(filename, uid, gid);
    console.log(filename, "Ownership changed successfully");
  } catch (err) {
    console.log(err);
  }
}
