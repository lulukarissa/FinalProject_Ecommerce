const crypto = require('crypto');
const secret = 'maqlo';



// JALANKAN NODE APP
var router = require('express').Router();
var mysql = require('mysql'); // hasil dari sudo npm i mysqljs/mysql
var bodyparser = require('body-parser'); //untuk nampoung apa yg user tangkep, jadi bisa gunakan req.body
const upload = require('express-fileupload');

var express = require('express')
var app = express()
var unggah = require('express-fileupload') // ini adalah middlewere
var cors = require('cors')
app.use(unggah())
app.use(cors())
app.use('/filestorage/', express.static('storage')) //INI ADALAH MIDLEWIRE BAWAAN EXPRESS UNTUK AKSES FIILE, CARANYA http://localhost:5000/filestorage/ins.png NANTI KELUAR GAMBARNYA


router.use(bodyparser.json())
router.use(upload());

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'dilarangmerokok',
        database: 'holyhug'
    })
    //untuk konekin ke database
db.connect(() => {
    console.log('connected database')
});



// untuk get data
// CARA KONEKIN INI PAKE CORS DI APP JS, SEMPET GABISA DIKARENAKAN Access-Control-Allow-Origin: * JADI HARUS DI ADD EXTENSION Access-Control-Allow-Origin: * LALU CARI DIINTERNET DAN DAPAT SOLUSI
// SOLUSI https://stackoverflow.com/questions/28547288/no-access-control-allow-origin-header-is-present-on-the-requested-resource-err
router.get('/data', (req, res) => {
    var perintah = 'select * from dataProduk order by id desc';
    // var perintah = 'select foto_produk from dataProduk';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})



// INI BUAT POST JANGAN DICOMMENt !!!!
router.post('/data', (req, res) => {
    var data = {
        kode: req.body.kode,
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        prodesc: req.body.prodesc
    }
    var perintah = 'insert into dataProduk set ?'
    db.query(perintah, data, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil) // untuk respon
    })
})



// -----------------------------------------------------------------ADD PRODUCT-------------------------------------------------------------------------


router.post('/kirimdata', (req, res) => {
    var kode = req.body.kode;
    var nama = req.body.nama;
    var harga = req.body.harga;
    var kategori = req.body.kategori;
    var prodesc = req.body.prodesc;
    var qty = req.body.qty;
    var foto_produk = req.files.foto_produk.name;

    if (kode !== '' && nama !== '' && harga !== '' && kategori !== '' && prodesc !== '' && foto_produk !== '') {
        var tampungFile = req.files.foto_produk;
        tampungFile.mv('./tampunganFile/' + foto_produk, (err) => {
            if (err) {
                console.log('Upload gagal!');
            } else {
                console.log('Upload berhasil!');

                var sql = `INSERT INTO dataProduk (kode, nama, harga, kategori, qty, prodesc, foto_produk) 
                     VALUES ("${kode}", "${nama}", "${harga}", "${kategori}", "${qty}", "${prodesc}", "${foto_produk}")`;
                db.query(sql, (err, result) => {
                    if (err) {
                        console.log('Error');
                    } else {
                        res.send('1');
                    }
                })
            }
        })
    }
});


// -----------------------------------------------------------------EDIT DATA-------------------------------------------------------------------------


/** Untuk mengambil data per id */
router.get('/getdata/:id', (req, res) => {
    /** Menyiapkan query untuk ke MySQL */
    var grabData = `SELECT * FROM dataProduk WHERE id = ${req.params.id}`;
    /** Mengeksekusi query dengan syntax nodeJS */
    db.query(grabData, (err, hasilquery) => {
        if (err) {
            /** Mengeluarkan pesan error apabila terjadi kesalahan */
            throw err;
        } else {
            /** Menyiapkan hasil query untuk siap dikirim */
            res.send(hasilquery);
        }
    })
});

/** Untuk mengupdate data */
router.post('/ubahData', (req, res) => {
    var id = req.body.id;
    var kode = req.body.kode;
    var nama = req.body.nama;
    var harga = req.body.harga;
    var kategori = req.body.kategori;
    var qty = req.body.qty;
    var prodesc = req.body.prodesc;
    // var fileName = req.files.file.name;

    // Ketika dapat kiriman yang berbentuk files maka akan dijalankan fungsi ini
    if (req.files) { // bisa juga ditulis if(req.files !== null) atau if(req.files !== false)
        var fileName = req.files.file.name;
        var fungsiFile = req.files.file;

        fungsiFile.mv("./tampunganFile/" + fileName, (kaloError) => {
            // if (kaloError) {
            //     console.log(kaloError);
            //     res.send('Upload failed');
            // } else {
            //     res.send('Upload berhasil');
            // }
            // var queryUpdate = `UPDATE produk_samid SET nama_produk = "${namaProduk}", 
            //             harga = "${hargaProduk}", foto_produk = "${fileName}" WHERE id="${id}"`;
            var queryUpdate = `UPDATE dataProduk SET foto_produk = "${fileName}" WHERE kode="${kode}"`;
            db.query(queryUpdate, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Update berhasil !!!!!! !');
                    console.log('Update berhasil !!!!!!!!!');
                    console.log(id);
                }
            });
        })
    } else if (req.files == null) {
        var queryUpdate = `UPDATE dataProduk SET kode="${kode}", nama = "${nama}", 
        harga = "${harga}", kategori = "${kategori}", qty = "${qty}", prodesc = "${prodesc}" WHERE id="${id}"`;
        db.query(queryUpdate, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Update berhasil !');
                console.log(result)
            }
        });
    }

});



// delete data id tertentu
router.delete('/delete/:id', (req, res) => {
    var perintah = 'delete from dataProduk where id = ?'
    db.query(perintah, req.params.id, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil) // untuk respon
    })
})



// ------------------------------------------------------------------CATEGORY-------------------------------------------------------------------------

router.get('/fleece', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="fleece" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/fleeceNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="fleece" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/fleeceCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="fleece" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/fleeceExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="fleece" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})













router.get('/wool', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="wool" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/woolNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="wool" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/woolCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="wool" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/woolExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="wool" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})












router.get('/catton', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="catton" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/cattonNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="catton" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/cattonCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="catton" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/cattonExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="catton" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})










router.get('/feather', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="feather" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/featherNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="feather" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/featherCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="feather" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/featherExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="feather" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})













router.get('/synthetic', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="synthetic" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/syntheticNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="synthetic" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/syntheticCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="synthetic" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/syntheticExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="synthetic" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})









router.get('/flanel', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="flanel" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/flanelNewest', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="flanel" order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/flanelCheap', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="flanel" order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/flanelExpensive', (req, res) => {
    var perintah = 'select * from dataProduk where kategori="flanel" order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})



router.get('/New', (req, res) => {
    var perintah = 'select * from dataProduk where kategori like "%New%" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})

router.get('/Best', (req, res) => {
    var perintah = 'select * from dataProduk where kategori like "%Best%" order by id desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})


// -------------------------------------------------------------------------------------------------------------------------------------------------------



// edit data id tertentu
router.put('/data/:id', (req, res) => {
    var data = {
        id: req.body.id,
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        prodesc: req.body.prodesc
    }
    var perintah = 'update dataProduk set ? where id = ?'
        // [data, req.params.id] data menuju ke var data dan req.params.id menuju ke idnya karena kita editnya bedasarkan pilihan dari idnya
    db.query(perintah, [data, req.params.id], (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil);
    })
})

// -------------------------------------------------------LOGIN-----DAN-----REGISTER--------------------------------------------------------------------------------------------

router.post('/register', (req, res) => {
    var data = {
        // id: req.body.id,
        username: req.body.username,
        password: req.body.password
    }
    var perintah = 'insert into newusers set ?'
    db.query(perintah, data, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil) // untuk respon
    })
})


router.post('/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM newusers';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && password === result[i].password) {
                    console.log('Login suskes');
                    var userId = result[i].id;
                    res.send((userId).toString());
                } else if (i === result.length - 1) {
                    console.log('Login gagal');
                }
            }
        }
    })
})


router.get('/verif', (req, res) => {
    var perintah = 'select * from newusers';
    // var perintah = 'select foto_produk from dataProduk';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})

// -------------------------------------------------------------------------------------------------------------------------------------------------------





// REACT SPINNER BIAR ADA LAMBANG LAGI LOADINGNYA
router.post('/upload', (req, res) => {
    // console.log("anda ngepost file")
    // res.send("anda ngepost file")
    // console.log(req.files) //hasilnya di terminal <buffer
    // res.send(req.files)

    if (req.files) { // artinya if(req.files !== null) atau if(req.files !== false)
        console.log(req.files)
        var unggahFile = req.files.file // file itu ada di terminal yg hasilnya buffer pake kdingan komen diatas
        var file = unggahFile.name
        unggahFile.mv('./tampunganFile/' + file, (err) => { // mv = move jadi untuk tujuan file yang telah di upload, disini di storage
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                console.log('File Sukses diupload')
                    // res.send("File Sukes Diupload")
                res.send(file) // ini biar bisa langusn kasih tau nama gambarnya apa lalu langsung di tampilkan di frontend
            }
        })
    }
})


// -------------------------------------------------------------------DASHBOARD----------------------------------------------------------

router.get('/jumlahdata', (req, res) => {
    var sql = 'SELECT COUNT(*) AS jumlah FROM invoice';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})

router.get('/jumlahuser', (req, res) => {
    var sql = 'SELECT COUNT(*) AS jumlah FROM newusers';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})








// -------------------------------------------------------------------Notification Invoice, member, cart(user)----------------------------------------------------------

router.post('/notifinvoice', (req, res) => {
    var perintah = `UPDATE notif SET invoice  = invoice+1 WHERE id=1`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /notifinvoice");
            res.send(hasil);
        }
    })
})

router.post('/notifmember', (req, res) => {
    var perintah = `UPDATE notif SET member  = member+1 WHERE id=1`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /notifmember");
            res.send(hasil);
        }
    })
})



router.post('/notifjumlah', (req, res) => {
    var perintah = `select sum(invoice+member) as notifjumlah from notif  where id = 1`;
    // var perintah = `select invoice from notif  where id = 1`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /notifjumlah");
            res.send(hasil);
        }
    })
})

router.post('/jumlahnotifmember', (req, res) => {
    var perintah = `select member from notif where id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /jumlahnotifmember");
            res.send(hasil);
        }
    })
})

router.post('/jumlahnotifinvoice', (req, res) => {
    var perintah = `select invoice from notif where id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /jumlahnotifinvoice");
            res.send(hasil);
        }
    })
})

router.post('/kurangnotifinvoice', (req, res) => {
    var perintah = `UPDATE notif SET invoice = 0 WHERE id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /kurangnotifinvoice");
            res.send(hasil);
        }
    })
})

router.post('/kurangnotifmember', (req, res) => {
    var perintah = `UPDATE notif SET member  = 0 WHERE id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /kurangnotifmember");
            res.send(hasil);
        }
    })
})






router.post('/notifcart', (req, res) => {
    var perintah = `UPDATE notifcart SET notifcart  = notifcart+1 WHERE id=1`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /notifcart");
            res.send(hasil);
        }
    })
})

router.post('/jumlahnotifcart', (req, res) => {
    var perintah = `select notifcart from notifcart where id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /jumlahnotifcart");
            res.send(hasil);
        }
    })
})

router.post('/kurangnotifcart', (req, res) => {
    var perintah = `UPDATE notifcart SET notifcart  = 0 WHERE id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /kurangnotifcart");
            res.send(hasil);
        }
    })
})


router.post('/kurangnotifdideletecartjs', (req, res) => {
    var perintah = `UPDATE notifcart SET notifcart  = notifcart - 1 WHERE id=1`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log("sukses /kurangnotifdideletecartjs");
            res.send(hasil);
        }
    })
})

// -------------------------------------------------------------------listmember.js----------------------------------------------------------

router.get('/listmember', (req, res) => {
    var perintah = 'select * from newusers1 order by id desc';
    db.query(perintah, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil);
        console.log("login sukses")
    })
})





// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------
// ----------------------------------------------M A S U K------F R O N T E N D-------------------------------------------------------------------------------




// --------------------------------------------------------------LOGIN DAN REGIATER--------------------------------------------------------------------------------------------------------------------------------------------
router.post('/profileuser', (req, res) => {
    var userId = req.body.userid;

    var sql = `SELECT * FROM newusers1 WHERE id = "${userId}"`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            res.send(result);
        }
    })
})


router.get('/verifuser', (req, res) => {
    var perintah = 'select * from newusers1';
    db.query(perintah, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil);
        console.log("login sukses")
    })
})

router.post('/loginuser', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    var sql = 'SELECT * FROM newusers1';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } else {
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && password === result[i].password) {
                    console.log('Login berhasil');
                    var userId = result[i].id;
                    res.send((userId).toString());
                } else if (i === result.length - 1) {
                    console.log('Login gagal');
                    console.log(username);
                    console.log(password);
                }
            }
        }
    })
})

router.post('/createaccount', (req, res) => {

    var nama = req.body.nama;
    var username = req.body.username;
    var email = req.body.email;
    var number = req.body.number;
    var address = req.body.address;
    var password = req.body.password;

    var sql = `INSERT INTO newusers1 (nama, username, email, number, address, password) VALUES ("${nama}", "${username}", "${email}", "${number}", "${address}", "${password}")`;
    db.query(sql, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil)
    })

})


router.post('/editprofile', (req, res) => {
    var id = req.body.id;
    var nama = req.body.nama;
    var username = req.body.username;
    var email = req.body.email;
    var number = req.body.number;
    var address = req.body.address;
    var password = req.body.password;


    if (req.files) {
        var fileName = req.files.file.name;
        var fungsiFile = req.files.file;

        fungsiFile.mv("./tampunganFile/" + fileName, (kaloError) => {
            var id = req.body.id;

            console.log(username)
            var queryUpdate = `UPDATE newusers1 SET photo_profile = "${fileName}" WHERE username="${username}"`;
            console.log(id)
            db.query(queryUpdate, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Update berhasil !!!!!! !');
                    console.log('Update berhasi !!!!!!!!!');
                    console.log(id);
                }
            });
        })
    } else if (req.files == null) {
        var queryUpdate = `UPDATE newusers1 SET nama="${nama}", username = "${username}", 
            email = "${email}", number = "${number}", address = "${address}", password = "${password}" WHERE id="${id}"`;
        db.query(queryUpdate, (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send('Update berhasil !');
            }
        });
    }

});



// -----------------------------------------------------------------CART AND CHECKOUT-----------------------------------------------------------------------------

router.post('/cart', (req, res) => {

    var username = req.body.username;

    var sql2 = `create table ${username} (id int not null auto_increment,id_tbldaftarproduk int, kode varchar(30), nama varchar(30), harga int, kategori varchar(30), qty int, prodesc varchar(30), foto_produk varchar(50), primary key (id))`
    db.query(sql2, (error, hasil) => {
        if (error) throw error;
        console.log(hasil);
        res.send(hasil)
    })
})



router.post('/addtochart', (req, res) => {
    var data = {
        id: req.body.id,

        kode: req.body.kode,
        nama: req.body.nama,
        harga: req.body.harga,
        kategori: req.body.kategori,
        qty: req.body.qty,
        prodesc: req.body.prodesc,
        username: req.body.username,
        foto: req.body.foto

    }

    var sql = `INSERT INTO  ${data.username} (id, id_tbldaftarproduk, kode,  nama, harga, kategori, qty, prodesc, foto_produk) VALUES (null,"${data.id}", "${data.kode}", "${data.nama}", "${data.harga}", "${data.kategori}", "${data.qty}", "${data.prodesc}", "${data.foto}")`;

    db.query(sql, data, (err, result) => {
            if (err) {
                // throw err;
                console.log("gagal")
                console.log(data.username)
            } else {
                res.send(result);
                console.log("sukses")
                    // console.log(qty)
            }
        })
        // break;


})


router.post('/carts', (req, res) => {

    var data = {
        username: req.body.username
    }

    var sql = `select * from ${data.username} order by id desc`;

    db.query(sql, data, (err, result) => {
        if (err) {
            // throw err;
            console.log("gag")
            console.log(data.username)
        } else {
            res.send(result);
            console.log("sukses /carts")
            console.log(data.username)
                // console.log(qty)
        }
    })
})


router.post('/deletecart/:id', (req, res) => {
    var username = req.body.username;
    var id = req.body.id;
    var perintah = `delete from ${username} where id = ${id}`
    db.query(perintah, req.params.id, (error, hasil) => {
        // if (error) throw error;
        if (error) {
            // throw error;
            console.log("gagal")
            console.log(id)
            console.log(username)
        } else {
            console.log("sukses deletecart");
            console.log(id);
            console.log(username);
            res.send(hasil) // untuk respon
        }
    })
})

router.post('/deleteallcart', (req, res) => {
    var username = req.body.username1;
    var id = req.body.id;
    var perintah = `delete from ${username}`
    db.query(perintah, (error, hasil) => {
        // if (error) throw error;
        if (error) {
            // throw error;
            console.log("gagal deleteallcart")
            console.log(id)
            console.log(username)
        } else {
            console.log(hasil);
            console.log("Sukses deletellacart");
            console.log(username);
            res.send(hasil) // untuk respon
        }
    })
})








// ------------------------------------------------------CHECKOUT (USER)-----------------------------------------------------------------------------

router.post('/sum', (req, res) => {
    var username = req.body.username;
    var id = req.body.id;
    var perintah = `select sum(harga*qty) as total from ${username}`
    db.query(perintah, req.params.id, (error, hasil) => {
        // if (error) throw error;
        if (error) {
            // throw error;
            console.log("gagal")
            console.log(id)
            console.log(username)
        } else {
            console.log(hasil);
            console.log(username);
            console.log(username);
            res.send(hasil) // untuk respon
        }
    })
})


router.post('/createinvoice', (req, res) => {
    var username1 = req.body.username1;
    var username = req.body.username;
    // var sql2 = `create table ${username1}invoice (id int not null auto_increment, invoice varchar(30), primary key (id))`
    var sql2 = `create table ${username1}invoice (id int not null auto_increment, invoice varchar(30), statusinvoice varchar(30), Date varchar(50),  primary key (id))`
    db.query(sql2, (error, hasil) => {
        if (error) {
            // throw error;
            console.log("gpp gagal")
        } else {
            console.log(hasil);
            res.send(hasil)
                // console.log(username)
        }
    })
})


router.post('/createinputinvoice', (req, res) => {
    var date = req.body.date;
    var username1 = req.body.username1;
    var username = req.body.username;
    var sql = `insert into ${username1}invoice (invoice, statusinvoice, Date) values ("${username}" ,null, "${date}")`
    db.query(sql, (error, hasil) => {
        if (error) {
            throw error;
            console.log("ok")
        } else {
            console.log(hasil);
            res.send(hasil)
            console.log(username)
        }
    })
})

router.post('/invoiceadmin', (req, res) => {
    var username1 = req.body.username1;
    var username = req.body.username;
    var date = req.body.date
    var sql = `insert into invoiceadmin values (null, "${username}", "${username1}", null, null, "${date}")`
    db.query(sql, (error, hasil) => {
        if (error) {
            throw error;
            console.log("ok")
        } else {
            console.log(hasil);
            res.send(hasil)
            console.log(username)
        }
    })
})

router.post('/bukti/:id', (req, res) => {
    var username = req.body.username
    var id = req.params.id

    var grabData = `SELECT * FROM ${username} where id = "${id}" `;
    db.query(grabData, (err, hasilquery) => {
        if (err) {
            console.log(username)
        } else {
            res.send(hasilquery);
        }
    })
});


// ============================================================= CONFIRM.JS (ADMIN)========================================================================================

router.post('/buktiuntukadmin/', (req, res) => {
    var noinvoice = req.body.invoice
    var username = req.body.username
    var isi = req.body.isi

    if (req.files) {
        var fungsiFile = req.files.file;
        var fileName = fungsiFile.name;

        var noinvoice = req.body.invoice

        fungsiFile.mv("./tampunganFile/" + fileName, () => {
            var perintah = `UPDATE invoiceadmin SET bukti = "${fileName}" WHERE noinvoice="${noinvoice}"`;
            db.query(perintah, (error, hasil) => {
                if (error) {
                    // throw error
                    console.log(id)
                    console.log(username)
                } else {
                    console.log("berhasil buktiuntukadmin")
                    console.log(noinvoice)
                }
            })
        })
    }

});


router.post('/invoiceadmin1', (req, res) => {
    var id = req.body.id
    var sql = `select * from invoiceadmin where id = ${id}`
    db.query(sql, (error, hasil) => {
        if (error) {
            throw error;
            console.log("ok")
        } else {
            console.log(hasil);
            res.send(hasil)
                // console.log(username)
        }
    })
})

router.get('/daftarinvoice', (req, res) => {
    var username1 = req.body.username1;
    var username = req.body.username;
    var sql = `select * from invoiceadmin order by id desc`
    db.query(sql, (error, hasil) => {
        if (error) {
            throw error;
            console.log("ok")
        } else {
            console.log(hasil);
            res.send(hasil)
            console.log(username)
        }
    })
})


router.post('/invoice', (req, res) => {
    var username = req.body.username;

    var sql2 = `create table ${username} (id int not null auto_increment, kode varchar(30), nama varchar(30), harga int, kategori varchar(30), qty int, prodesc varchar(30), foto_produk varchar(50), fullname varchar(40), email varchar(40), phone varchar(30), address varchar(50), bank varchar(30), primary key (id))`
    db.query(sql2, (error, hasil) => {
        if (error) {
            throw error;
            console.log(username)
        } else {
            console.log("BERHASIL /INVOICE");
            res.send(hasil)
            console.log(username)
        }
    })
})



router.post('/inputinvoice', (req, res) => {
    var username1 = req.body.username1;
    var username = req.body.username;

    var sql = `insert into ${username} (kode,nama,harga,kategori,qty,prodesc,foto_produk) select kode,nama,harga,kategori,qty,prodesc,foto_produk from ${username1}`
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
            console.log("gagal")
            console.log(username)
            console.log(username1)
        } else {
            res.send(result);
            console.log("sukses")
                // console.log(qty)
        }
    })
})

router.post('/inputinvoice2', (req, res) => {
    var username1 = req.body.username1;
    var username = req.body.username;
    var data = {
        fullname: req.body.fullname,
        email: req.body.email,
        // harga: req.body.harga,
        phone: req.body.phone,
        address: req.body.address,
        bank: req.body.bank,
    }

    var sql2 = `UPDATE ${username} SET fullname="${data.fullname}", email = "${data.email}", 
    phone = "${data.phone}", address = "${data.address}", bank = "${data.bank}" WHERE id=1`;

    db.query(sql2, data, (err, result) => {
        if (err) {
            throw err;
            console.log("gagal")
            console.log(username)
            console.log(username1)
        } else {
            res.send(result);
            console.log("sukses")
                // console.log(qty)
        }
    })
})



router.post('/datainvoice', (req, res) => {
    var username = req.body.username1;
    var perintah = `select * from ${username} order by id desc`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            console.log('Belum pernah checkout')
        } else {
            res.send(hasil);
            console.log("datainvoice")
            console.log(username)
        }
    })
})


router.post('/invc/:table', (req, res) => {
    var invc = req.params.table
    var grabData = `SELECT * FROM ${invc}`;
    db.query(grabData, (err, hasilquery) => {
        if (err) {} else {
            res.send(hasilquery);
        }
    })
});


router.post('/info/:table', (req, res) => {
    var invc = req.params.table
    var grabData = `SELECT * FROM ${invc} where id = 1`;
    db.query(grabData, (err, hasilquery) => {
        if (err) {
            throw err;
            console.log("GAGAL info/:table")
        } else {
            console.log("Berhasil info/:table ")
            res.send(hasilquery);
        }
    })
});




router.post('/deleteinvdetail', (req, res) => {
    var id = req.body.id
    var username = req.body.username

    var perintah = `delete from ${username} where id = ${id}`
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error;
        } else {
            console.log(hasil);
            res.send(hasil)
        }
    })
})


router.post('/deleteinv', (req, res) => {
    var invc = req.body.invc

    var id = req.body.invc
    var username = req.body.username
    var invcid = req.body.id

    var perintah = `drop table ${invc}`
    db.query(perintah, (error, hasil) => {
        if (error) {
            // throw error
            console.log(invcid);
            console.log(id);
            console.log(username);
        } else {
            console.log("berhasil deleteinv");
        }
    })
})



router.post('/data1', (req, res) => {
    var id = req.body.id
    var qty = req.body.qty

    var perintah = `UPDATE dataProduk SET qty  = qty-${qty} WHERE id="${id}"`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log(hasil);
            res.send(hasil);
        }
    })
})




router.post('/data2', (req, res) => {
    var id = req.body.id_tbldaftarproduk
    var qty = req.body.qty

    var perintah = `UPDATE dataProduk SET qty  = qty+${qty} WHERE id="${id}"`;
    db.query(perintah, (error, hasil) => {
        if (error) {
            throw error
        } else {
            console.log(hasil);
            res.send(hasil);
        }
    })
})




//  ======================================================= DASHBOARD INVOICE ADMIN ==================================================================================

router.post('/invoiceadmin2', (req, res) => {
    var username = req.body.username;
    var noinvoice = req.body.noinvoice;
    var status = req.body.status;

    var sql2 = `UPDATE ${username} SET statusinvoice="${status}" WHERE invoice="${noinvoice}"`;

    db.query(sql2, (err, result) => {
        if (err) {
            throw err;
            console.log("gagal")
        } else {
            res.send(result);
            console.log("sukses")
        }
    })
})

router.post('/invoiceadmin3', (req, res) => {
    var noinvoice = req.body.noinvoice;
    var status = req.body.status;

    var sql2 = `UPDATE invoiceadmin SET status="${status}" WHERE noinvoice="${noinvoice}"`;

    db.query(sql2, (err, result) => {
        if (err) {
            throw err;
            console.log("gagal")
            console.log("username")
        } else {
            res.send(result);
            console.log("sukses")
        }
    })
})



//  ========================================================== DETAIL INV.JS ==================================================================================



router.post('/amount', (req, res) => {
    var invc = req.body.invc;
    // var invc = req.params.table
    var id = req.body.id;
    var perintah = `select sum(harga*qty) as total from ${invc}`
    db.query(perintah, req.params.id, (error, hasil) => {
        // if (error) throw error;
        if (error) {
            // throw error;
            console.log("gagal")
            console.log(id)
                // console.log(username)
        } else {
            console.log(hasil);
            // console.log(username);
            console.log("amount");
            res.send(hasil) // untuk respon
        }
    })
})




//  ========================================================== UNTUK UPLOAD BUKTI TRANSFER ==================================================================================
router.post('/data3/', (req, res) => {
    var id = req.params.id
    var username = req.body.username
    var isi = req.body.isi

    if (req.files) {
        var fungsiFile = req.files.file;
        var fileName = fungsiFile.name;

        var id = req.body.id
        var username = req.body.username
        var isi = req.body.isi

        fungsiFile.mv("./tampunganFile/" + fileName, () => {
            var perintah = `UPDATE ${username} SET statusinvoice = "${fileName}" WHERE id="${id}"`;
            db.query(perintah, (error, hasil) => {
                if (error) {
                    // throw error
                    console.log(id)
                    console.log(username)
                } else {
                    console.log("berhasil")
                }
            })
        })
    }

});


router.post('/buktitransfer', (req, res) => {
    var id = req.body.id
    var username = req.body.username
    var isi = req.body.isi

    if (req.files) {
        var fileName = req.files.file.name;
        var fungsiFile = req.files.file;

        fungsiFile.mv("./tampunganFile/" + fileName, (kaloError) => {
            var perintah = `UPDATE ${username} SET  statusinvoice = ${fileName} WHERE id="${id}"`;
            db.query(perintah, (err, result) => {
                if (err) {
                    throw err;
                } else {
                    res.send('Update berhasil !!!!!! !');
                    console.log('Update berhasil !!!!!!!!!');
                    console.log(id);
                }
            });
        })
    }
});


// --------------------------------------------------------------Search (allproduct.js)--------------------------------------------------------------------------------------------------------------------------------------------
router.get('/allproduct', (req, res) => {
    var perintah = 'select * from dataProduk order by id desc';
    // var perintah = 'select foto_produk from dataProduk';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})

router.get('/allproductNewest', (req, res) => {
    var perintah = 'select * from dataProduk order by id asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/allproductCheap', (req, res) => {
    var perintah = 'select * from dataProduk order by harga asc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})
router.get('/allproductExpensive', (req, res) => {
    var perintah = 'select * from dataProduk order by harga desc';
    // var perintah = 'select foto_produk from produk_mainan';
    db.query(perintah, (error, hasil) => {
            if (error) throw error; //ini kasih tahu kalo error 
            console.log(hasil);
            res.send(hasil);
        })
        // coba jalankan node app maka data yg di database mysql akan ada di terminal
})


router.post('/search', (req, res) => {
    // var search = req.body.search
    var grabData = `SELECT * FROM dataProduk`;
    // var grabData = `SELECT * FROM dataProduk `;
    db.query(grabData, (err, hasilquery) => {
        if (err) {
            throw err;
            console.log("GAGAL /search")
        } else {
            console.log("Berhasil /search ")
                // console.log(search)
            res.send(hasilquery);
        }
    })
});



module.exports = router;