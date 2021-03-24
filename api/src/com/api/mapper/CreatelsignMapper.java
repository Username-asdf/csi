package com.api.mapper;

import com.api.pojo.Createlsign;
import com.api.pojo.CreatelsignExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface CreatelsignMapper {
    long countByExample(CreatelsignExample example);

    int deleteByExample(CreatelsignExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Createlsign record);

    int insertSelective(Createlsign record);

    List<Createlsign> selectByExample(CreatelsignExample example);

    Createlsign selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Createlsign record, @Param("example") CreatelsignExample example);

    int updateByExample(@Param("record") Createlsign record, @Param("example") CreatelsignExample example);

    int updateByPrimaryKeySelective(Createlsign record);

    int updateByPrimaryKey(Createlsign record);
}