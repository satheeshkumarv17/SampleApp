var config = {
    entry: './main.js',
    output: {
       path:'/',
       filename: 'index.js',
    },
    devServer: {
       inline: true,
       port: 8010,
       historyApiFallback: true, 
       host: '0.0.0.0' 
    },
    resolve: {
        extensions: [".jsx", ".json", ".js"]
      },
    module: {
      rules: [
            {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               loader: 'babel-loader',
               query: {
                  presets: ['es2015', 'react']
               }
            },
            {
               test: /\.css$/,
               use: [
                 'style-loader',
                 'css-loader'
               ]
             },
  
         //    {
         //      test   : /\.css$/,
         //      loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
         //    },
  
          
            // { test: /\.png$/, loader: "file-loader" },
            // { test: /\.gif$/, loader: "file-loader" },
            // { test: /\.jpg$/, loader: "file-loader" },
  
         //    { test: /\.(scss|css)$/, loader: "style-loader!css-loader" },
           
         {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: 'file-loader',
            options: {
              name: '/public/image/[name].[ext]'
            }
        }
         ]
    }
 }
 module.exports = config;