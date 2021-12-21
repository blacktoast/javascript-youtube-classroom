" Plug-In 시작 (플러그인 설치 경로)
call plug#begin('~/.vim/plugged')

" 설치하고 싶은 플러그인 (예, NERDTree)
Plug 'preservim/nerdtree'

""Plug 'neovim/nvim-lspconfig'
""Plug 'glepnir/lspsaga.nvim'
Plug 'vim-airline/vim-airline'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'neoclide/coc.nvim', {'branch': 'release'}
Plug 'altercation/vim-colors-solarized'
Plug 'tpope/vim-fugitive'
" Syntax hightlight for .jsx
Plug 'mxw/vim-jsx'
Plug 'pangloss/vim-javascript'
Plug 'leafgarland/typescript-vim' " TypeScript syntax
Plug 'maxmellon/vim-jsx-pretty'   " JS and JSX syntax
" Syntax hightlight for .js
Plug 'ianks/vim-tsx', { 'for': 'typescript.tsx' }

Plug 'Raimondi/delimitMate'
Plug 'ap/vim-css-color'

" Syntax highlight for .ts
Plug 'HerringtonDarkholme/yats.vim', { 'for': 'typescript' }
Plug 'morhetz/gruvbox'
" post install (yarn install | npm install) then load plugin only for editing supported files
"
" post install (yarn install | npm install) then load plugin only for editing supported files
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install --frozen-lockfile --production',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'svelte', 'yaml', 'html'] }

" 플러그인 시스템 초기화
call plug#end()
" nvim treesitter
"
autocmd vimenter * ++nested colorscheme gruvbox






" 이하 nvim 설정
set nu
set ts=2
set sts=2
set tabstop=2
set shiftwidth=2
set softtabstop=2
set expandtab
let g:airline#extensions#tabline#enabled = 1


let delimitMate_expand_cr=1
nmap <space>r <Plug>(coc-rename)


" <F1> 을 통해 NERDTree 와 Tagbar 열기
nnoremap <silent><F1> :NERDTreeToggle<CR><bar>:TagbarToggle <CR> 
nnoremap <leader>n :NERDTreeFocus<CR>
" or use command
"

"" nerdtree안에서 l키누를시 현재파일 열수있게 하는 키매핑j
let NERDTreeMapCustomOpen=';'
"" 버퍼 이동""
nnoremap <space>bnn :bNext<CR>
nnoremap <space>bn :bn
nnoremap <space>bpp :bp<CR>
nnoremap <space>bp :bp

" <Ctrl + h, l> 를 눌러서 이전, 다음 탭으로 이동
nnoremap <silent><C-j> tabprevious<CR>
nnoremap <silent><S-w>; <C-w>l 
nnoremap <silent><S-w>j <C-w>h
" jk 혹은 kj 를 누르면 <ESC>  실행
imap <silent>kl <ESC><S-;>
imap <silent>lk <ESC>
imap <leader>t kj:tag
inoremap " ""<left>
inoremap ' ''<left>
inoremap < <><left>
inoremap ( ()<left>
nnoremap ; l
nnoremap l j
nnoremap j h
vnoremap ; l
vnoremap l j
vnoremap j h
" <Ctrl + j, k> 를 눌러서 이전, 다음 버퍼로 전환
""nnoremap <silent><S-w>t :NERDTreeFocus<CR>
nnoremap <silent><C-h> :bp<CR>

"Use 24-bit (true-color) mode in Vim/Neovim when outside tmux.
"If you're using tmux version 2.2 or later, you can remove the outermost $TMUX check and use tmux's 24-bit color support
"(see < http://sunaku.github.io/tmux-24bit-color.html#usage > for more information.)
if (empty($TMUX))
  if (has("nvim"))
    "For Neovim 0.1.3 and 0.1.4 < https://github.com/neovim/neovim/pull/2198 >
    let $NVIM_TUI_ENABLE_TRUE_COLOR=1
  endif
  "For Neovim > 0.1.5 and Vim > patch 7.4.1799 < https://github.com/vim/vim/commit/61be73bb0f965a895bfb064ea3e55476ac175162 >
  "Based on Vim patch 7.4.1770 (`guicolors` option) < https://github.com/vim/vim/commit/8a633e3427b47286869aa4b96f2bfc1fe65b25cd >
  " < https://github.com/neovim/neovim/wiki/Following-HEAD#20160511 >
  if (has("termguicolors"))
    set termguicolors
  endif
endif


"" coc 관련 옵션들 ""
let g:coc_global_extensions = ['coc-tsserver', 'coc-json']

" Use `[g` and `]g` to navigate diagnostics
" Use `:CocDiagnostics` to get all diagnostics of current buffer in location list.
nmap <silent> [g <Plug>(coc-diagnostic-prev)
nmap <silent> ]g <Plug>(coc-diagnostic-next)

nmap <silent>gd <Plug>(coc-definition)
nmap <silent>gy <Plug>(coc-type-definition)
nmap <silent>gi <Plug>(coc-implementation)
nmap <space>g <Plug>(coc-references)
nmap <leader>qf  <Plug>(coc-fix-current)

"" coc autocomlete option

" use <tab> for trigger completion and navigate to the next complete item
function! s:check_back_space() abort
  let col = col('.') - 1
  return !col || getline('.')[col - 1]  =~ '\s'
endfunction



"" coc 자동완성 기능 탭으로 이동할수있게 하는 설정
inoremap <silent><expr> <Tab>
      \ pumvisible() ? "\<C-n>" :
      \ <SID>check_back_space() ? "\<Tab>" :
      \ coc#refresh()
inoremap <expr> <cr> pumvisible() ? "\<C-y>" : "\<C-g>u\<CR>"

nnoremap <silent> K :call <SID>show_documentation()<CR>

function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  elseif (coc#rpc#ready())
    call CocActionAsync('doHover')
  else
    execute '!' . &keywordprg . " " . expand('<cword>')
  endif
endfunction

" Highlight the symbol and its references when holding the cursor.
autocmd CursorHold * silent call CocActionAsync('highlight')
