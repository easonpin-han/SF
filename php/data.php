<?php
include "conn.php";
$conn->query('SET NAMES UTF8');
$result1=$conn->query("select * from floorpic");
$result2=$conn->query("select * from indexpic");
$result3=$conn->query("select * from jpflpic");
$result4=$conn->query("select * from jpfltitle");
$result5=$conn->query("select * from lunbo");
$result6=$conn->query("select * from share");
$result7=$conn->query("select * from tuijian");
$result8=$conn->query("select * from youxuan");
$result9=$conn->query("select * from detail");

$arrdata1=array();
for($i=0;$i<$result1->num_rows;$i++){
    $arrdata1[$i]=$result1->fetch_assoc();
}
$arrdata2=array();
for($i=0;$i<$result2->num_rows;$i++){
    $arrdata2[$i]=$result2->fetch_assoc();
}
$arrdata3=array();
for($i=0;$i<$result3->num_rows;$i++){
    $arrdata3[$i]=$result3->fetch_assoc();
}
$arrdata4=array();
for($i=0;$i<$result4->num_rows;$i++){
    $arrdata4[$i]=$result4->fetch_assoc();
}
$arrdata5=array();
for($i=0;$i<$result5->num_rows;$i++){
    $arrdata5[$i]=$result5->fetch_assoc();
}
$arrdata6=array();
for($i=0;$i<$result6->num_rows;$i++){
    $arrdata6[$i]=$result6->fetch_assoc();
}
$arrdata7=array();
for($i=0;$i<$result7->num_rows;$i++){
    $arrdata7[$i]=$result7->fetch_assoc();
}
$arrdata8=array();
for($i=0;$i<$result8->num_rows;$i++){
    $arrdata8[$i]=$result8->fetch_assoc();
}
$arrdata9=array();
for($i=0;$i<$result9->num_rows;$i++){
    $arrdata9[$i]=$result9->fetch_assoc();
}

class data{
}
$news=new data();
$news->floorpic=$arrdata1;
$news->indexpic=$arrdata2;
$news->jpflpic=$arrdata3;
$news->jpfltitle=$arrdata4;
$news->lunbo=$arrdata5;
$news->share=$arrdata6;
$news->tuijian=$arrdata7;
$news->youxuan=$arrdata8;
$news->detail=$arrdata9;

echo json_encode($news);